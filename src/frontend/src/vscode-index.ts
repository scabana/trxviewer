import { createColorPalette, FASTDesignSystemProvider, parseColorString } from "@microsoft/fast-components";
import { parseDocumentToTestRun, parseStringXml, context, Context, updateTestRun } from "./index";
import { } from "vscode";

declare global {
	interface Window {
		acquireVsCodeApi: () => any;
	}
}

interface VsCodeWebView {
	getState: () => any,
	setState: (state: any) => void,
	postMessage: (message: any) => void
}

interface VsCodeContext extends Context {
	vscode: VsCodeWebView
}

let vsCodeContext = context as VsCodeContext;

vsCodeContext.vscode = context.window.acquireVsCodeApi();

context.window.document.addEventListener("readystatechange", () => {
	let observer = new MutationObserver(() => {

		var backgroundValue = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-editorPane-background"));
		var accentColor = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-focusBorder"));

		for (let item of Array.from(document.getElementsByTagName("fast-design-system-provider"))) {

			let typedItem: FASTDesignSystemProvider = item as FASTDesignSystemProvider;

			if (typedItem.accentBaseColor != accentColor) {
				typedItem.accentBaseColor = accentColor;
				typedItem.accentPalette = createColorPalette(parseColorString(accentColor));
			}
			if (typedItem.backgroundColor != backgroundValue) {
				typedItem.backgroundColor = backgroundValue;
				typedItem.neutralPalette = createColorPalette(parseColorString(backgroundValue));
			}

			if (document.documentElement.style.getPropertyValue("--background-color") != typedItem.backgroundColor) {
				document.documentElement.style.setProperty('--background-color', typedItem.backgroundColor);
			}
		}
	});

	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

	for (let item of Array.from(document.getElementsByTagName("fast-design-system-provider"))) {
		(item as FASTDesignSystemProvider).backgroundColor = document.documentElement.style.getPropertyValue("--vscode-editorPane-background");
	}
});

context.window.addEventListener('message', event => {
	const message = event.data; // The json data that the extension sent
	switch (message.type) {
		case 'update':
			{
				const content = message.content;

				vsCodeContext.vscode.setState(content);
				let xmlDocument = parseStringXml(content);
				context.testResultXmlDocument = xmlDocument;
				let testResult = parseDocumentToTestRun(xmlDocument);

				updateTestRun(testResult);
			}
	}
});

context.blazorCallbacks.showFilePicker = () => false;
context.blazorCallbacks.canShowTest = () => true;
context.blazorCallbacks.navToTestMethod = testId => {

	let test = context.blazorCallbacks.getTestModel(testId);
	vsCodeContext.vscode.postMessage({ type: "navToTest", symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
};

function normalizeColor(color: string | any) {
	if (typeof color != "string") {
		return color;
	}

	if (color.startsWith("rgba")) {

		let content = (/rgba\((?<content>.+)\)/.exec(color) as any).groups.content;
		let newContent = content.split(",").splice(0, 3).join(",");

		return `rgb(${newContent})`;
	}

	return color;
}

let state = vsCodeContext.vscode.getState();
if (state) {
	context.testResultXmlDocument = parseStringXml(state);
	updateTestRun(parseDocumentToTestRun(context.testResultXmlDocument));
}

