import { createColorPalette, FASTDesignSystemProvider, parseColorString } from "@microsoft/fast-components";
import { updateTestRun, callbacks } from "./index";
import { normalizeColor } from "./utils/styles";

declare global {
	interface Window {
		acquireVsCodeApi: () => VsCodeWebView;
	}

	interface VsCodeWebView {
		getState: () => any,
		setState: (state: any) => void,
		postMessage: (message: any) => void
	}

}

let vscode = window.acquireVsCodeApi();

window.document.addEventListener("readystatechange", () => {
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

window.addEventListener('message', event => {
	const message = event.data; // The json data that the extension sent
	switch (message.type) {
		case 'update':
			{
				const content = message.content;
				vscode.setState(content);
				updateTestRun(content);
			}
	}
});

callbacks.showFilePicker = () => false;
callbacks.canShowTest = () => true;
callbacks.navToTestMethod = testId => {
	let test = callbacks.getTestModel(testId);
	vscode.postMessage({ type: "navToTest", symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
};
callbacks.raiseTestMethodExists = testId => {
	let test = callbacks.getTestModel(testId);
	vscode.postMessage({ type: "testMethodExists", testId: testId, symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
};

let state = vscode.getState();
if (state) {
	updateTestRun(state);
}

