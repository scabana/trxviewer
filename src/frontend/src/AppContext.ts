import Vue from 'vue';
import App from './App.vue';
import Callbacks from './models/Callbacks';
import TestRunState from './models/state/TestRunState';
import Theme from './models/Theme';
import TestRun from './models/trx/TestRun';
import { parseDocumentToTestRun, parseStringXml } from './utils/trx';

declare global {
	interface Window {
		app: Vue;
	}
}

declare module 'vue/types/vue' {
	interface Vue extends Callbacks {
		testRun: TestRun,
		testRunState: TestRunState,
		theme: Theme
	}
}


let app: Vue | null = null;
let callbacks: Callbacks | null = null;
let testRunDocument: Document | null = null;
const state: TestRunState = {
	resultGroups: {

	},
	filter: ""
};

export function createApp(cb: Callbacks) {
	callbacks = cb;

	window.app = app = new Vue({
		el: "#app",
		render: r => r(App),
		data: {
			testRun: null,
			testRunState: state,
			theme: null
		},
		methods: cb
	});
}

export function getTestModel(testId: string) {
	const test = testRunDocument?.querySelector(`TestDefinitions>UnitTest[id="${testId}"]`);
	const testMethod = test?.querySelector("TestMethod");

	return {
		name: test?.getAttribute("name") || "",
		testMethodClassName: testMethod?.getAttribute("className") || "",
		testMethodName: testMethod?.getAttribute("name") || ""
	};
}

export function getTestResultOutputModel(testId: string) {
	const errorInfo = testRunDocument?.querySelector(`Results>UnitTestResult[testId="${testId}"] > Output > ErrorInfo`);

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

export function updateTestRun(content: string) {
	testRunDocument = parseStringXml(content);
	app!.testRun = parseDocumentToTestRun(testRunDocument);
}

export function updateTestRunState(state: TestRunState) {
	app!.testRunState = state;
}

export function getApp() {
	return app!;
}