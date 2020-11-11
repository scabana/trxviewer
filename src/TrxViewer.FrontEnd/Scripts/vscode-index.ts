import { createColorPalette, parseColorString } from "@microsoft/fast-components";
import { parseStringToTestResult, parseStringXml, context, Context } from "./index";

interface VsCodeWebView {
	getState: () => any,
	setState: (state: any) => void,
	postMessage: (message: any) => void
}

interface VsCodeContext extends Context {
	vscode: VsCodeWebView
}

let vsCodeContext = context as VsCodeContext;
let blazor = context.window["Blazor"];
let dotNet = context.window["DotNet"];

vsCodeContext.vscode = context.window["acquireVsCodeApi"]();

context.window.document.addEventListener("readystatechange", () => {
	var observer = new MutationObserver(() => {

		var backgroundValue = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-editorPane-background"));
		var accentColor = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-focusBorder"));

		for (var item of Array.from(document.getElementsByTagName("fast-design-system-provider"))) {
			if (item["accentBaseColor"] != accentColor) {
				item["accentBaseColor"] = accentColor;
				item["accentPalette"] = createColorPalette(parseColorString(accentColor));
			}
			if (item["backgroundColor"] != backgroundValue) {
				item["backgroundColor"] = backgroundValue;
				item["neutralPalette"] = createColorPalette(parseColorString(backgroundValue));
			}
		}

		if (document.documentElement.style.getPropertyValue("--background-color") != document.getElementsByTagName("fast-design-system-provider")[0]["backgroundColor"]) {
			document.documentElement.style.setProperty('--background-color', document.getElementsByTagName("fast-design-system-provider")[0]["backgroundColor"]);
		}
	});

	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

	for (var item of Array.from(document.getElementsByTagName("fast-design-system-provider"))) {
		item["backgroundColor"] = document.documentElement.style.getPropertyValue("--vscode-editorPane-background");
	}
});

context.window.addEventListener('message', event => {
	const message = event.data; // The json data that the extension sent
	switch (message.type) {
		case 'update':
			{
				const content = message.content;

				context.startPromise?.then(() => {
					vsCodeContext.vscode.setState(content);
					let xmlDocument = parseStringXml(content);
					context.testResultXmlDocument = xmlDocument;
					let testResult = parseStringToTestResult(xmlDocument);

					dotNet.invokeMethodAsync('TrxViewer.FrontEnd', 'UpdateMessageCaller', testResult);
				});
			}
	}
});

context.blazorCallbacks.showFilePicker = () => false;
context.blazorCallbacks.canShowTest = () => true;
context.blazorCallbacks.navToTestMethod = testId => {

	let test = context.blazorCallbacks.getTestModel(testId);
	vsCodeContext.vscode.postMessage({ type: "navToTest", symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
};

function normalizeColor(colorString) {
	if (typeof colorString != "string") {
		return colorString;
	}

	if (colorString.startsWith("rgba")) {

		let content = (/rgba\((?<content>.+)\)/.exec(colorString) as any).groups.content;
		let newContent = content.split(",").splice(0, 3).join(",");

		return `rgb(${newContent})`;
	}

	return colorString;
}

/*
	Hack to get it to load in vscode.
	*/

blazor._internal.navigationManager.getLocationHref = function () {
	return document.baseURI;
}

context.startPromise = blazor.start();

let state = vsCodeContext.vscode.getState();
if (state) {
	context.testResultXmlDocument = parseStringXml(state);
	context.startPromise.then(() => {
		dotNet.invokeMethodAsync('TrxViewer.FrontEnd', 'UpdateMessageCaller', parseStringToTestResult(context.testResultXmlDocument));
	});
}

