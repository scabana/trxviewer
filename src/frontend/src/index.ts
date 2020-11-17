import { FASTDesignSystemProvider } from '@microsoft/fast-components';
import Vue from 'vue'
import App from './App.vue'

let app: Vue = new Vue({
	el: "#app",
	render: r => r(App),
	data: {
		testRun: null
	}
});

declare module 'vue/types/vue' {
	// 3. Declare augmentation for Vue
	interface Vue {
		testRun: TestRun
	}
}

declare global {
	interface Window {
		app: Vue;
	}
}

window.app = app;

export interface Context {
	window: Window,
	testResultXmlDocument?: Document,
	blazorCallbacks: BlazorCallbacks,
	startPromise?: Promise<undefined>,
}

interface BlazorCallbacks {
	canShowTest: () => boolean,
	showFilePicker: () => boolean,
	navToTestMethod: (testId: string) => void,
	getTestModel: (testId: string) => TestModel,
	getTestResultOutputModel: (testId: string) => TestResultOutputModel | null,
}

interface TestModel {
	testMethodName: string;
	testMethodClassName: string;

}

interface TestResultOutputModel {

}

export let context: Context = {
	window,
	blazorCallbacks: {
		canShowTest: () => false,
		showFilePicker: () => true,
		navToTestMethod: () => { },
		getTestModel: testId => {
			let test = context.testResultXmlDocument?.querySelector(`TestDefinitions>UnitTest[id="${testId}"]`);
			let testMethod = test?.querySelector("TestMethod");

			return {
				name: test?.getAttribute("name") || "",
				testMethodClassName: testMethod?.getAttribute("className") || "",
				testMethodName: testMethod?.getAttribute("name") || "",
			}
		},
		getTestResultOutputModel: testId => {
			let errorInfo = context.testResultXmlDocument?.querySelector(`Results>UnitTestResult[testId="${testId}"] > Output > ErrorInfo`);

			if (errorInfo == null) {
				return null;
			}

			return {
				errorInfo: {
					message: errorInfo?.querySelector("Message")?.innerHTML || "",
					stackTrace: errorInfo?.querySelector("StackTrace")?.innerHTML || ""
				}
			};
		}
	},
};

context.window.document.addEventListener("readystatechange", () => {

	const elements = document.getElementsByTagName("fast-design-system-provider");

	if (elements.length == 0) {
		return;
	}

	const designSystem = elements[0] as FASTDesignSystemProvider;

	document.documentElement.style.setProperty('--background-color', designSystem.backgroundColor);
});

export function parseStringXml(string: string) {
	let parser = new DOMParser();
	return parser.parseFromString(string, "application/xml");
}

interface TestRun {
	resultSummary: ResultSummary
	results: UnitTestResult[]
}



interface ResultSummary {
	outcome: string
}

interface UnitTestResult {

}

export function parseDocumentToTestRun(xmlDocument: Document) {

	let summary = xmlDocument.documentElement.querySelector("ResultSummary");

	let jsonObject: TestRun = {
		resultSummary: {
			outcome: summary?.getAttribute("outcome") || ""
		},
		results: []
	};

	for (let item of Array.from(xmlDocument.documentElement.querySelectorAll("Results>UnitTestResult"))) {
		jsonObject.results.push({
			testName: item.getAttribute("testName"),
			outcome: item.getAttribute("outcome"),
			testId: item.getAttribute("testId")
		});
	}

	return jsonObject;
}

export function updateTestRun(testRun: TestRun) {
	app.testRun = testRun;
}
