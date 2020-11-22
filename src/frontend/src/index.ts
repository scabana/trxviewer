import { FASTDesignSystemProvider } from '@microsoft/fast-components';
import Vue from 'vue'
import App from './App.vue'
import TestRun from './models/TestRun';
import { parseDocumentToTestRun, parseStringXml } from './utils/trx';
import { Callbacks } from './models/Callbacks';

let app: Vue = new Vue({
	el: "#app",
	render: r => r(App),
	data: {
		testRun: null
	}
});

let testRunDocument: Document | null = null;

declare module 'vue/types/vue' {
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

export let callbacks: Callbacks = {
	canShowTest: () => false,
	raiseTestMethodExists: testId => { },
	showFilePicker: () => true,
	navToTestMethod: () => { },
	getTestModel: testId => {
		let test = testRunDocument?.querySelector(`TestDefinitions>UnitTest[id="${testId}"]`);
		let testMethod = test?.querySelector("TestMethod");

		return {
			name: test?.getAttribute("name") || "",
			testMethodClassName: testMethod?.getAttribute("className") || "",
			testMethodName: testMethod?.getAttribute("name") || "",
		}
	},
	getTestResultOutputModel: testId => {
		let errorInfo = testRunDocument?.querySelector(`Results>UnitTestResult[testId="${testId}"] > Output > ErrorInfo`);

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
};

window.document.addEventListener("readystatechange", () => {

	const elements = document.getElementsByTagName("fast-design-system-provider");

	if (elements.length == 0) {
		return;
	}

	const designSystem = elements[0] as FASTDesignSystemProvider;

	document.documentElement.style.setProperty('--background-color', designSystem.backgroundColor);
});


export function updateTestRun(testRun: string) {
	testRunDocument = parseStringXml(testRun);
	app.testRun = parseDocumentToTestRun(testRunDocument);
}
