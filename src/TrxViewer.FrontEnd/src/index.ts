import Vue from 'vue'
import App from './App.vue'

let app = new Vue({
	el: "#app",
	render: r => r(App),
	data: {
		testRun: null
	}
});
window["app"] = app;

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
	getTestResultOutputModel: (testId: string) => TestResultOutputModel,
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
			let test = context.testResultXmlDocument.querySelector(`TestDefinitions>UnitTest[id="${testId}"]`);
			let testMethod = test.querySelector("TestMethod");

			return {
				name: test.getAttribute("name"),
				testMethodClassName: testMethod.getAttribute("className"),
				testMethodName: testMethod.getAttribute("name"),
			}
		},
		getTestResultOutputModel: testId => {
			let errorInfo = context.testResultXmlDocument.querySelector(`Results>UnitTestResult[testId="${testId}"] > Output > ErrorInfo`);

			if (errorInfo == null) {
				return null;
			}

			return {
				errorInfo: {
					message: errorInfo.querySelector("Message").innerHTML,
					stackTrace: errorInfo.querySelector("StackTrace").innerHTML
				}
			};
		}
	},
};

context.window["blazorCallbacks"] = context.blazorCallbacks;

context.window.document.addEventListener("readystatechange", () => {
	document.documentElement.style.setProperty('--background-color', document.getElementsByTagName("fast-design-system-provider")[0]["backgroundColor"]);
});

export function parseStringXml(string) {
	let parser = new DOMParser();
	return parser.parseFromString(string, "application/xml");
}

export function parseStringToTestResult(xmlDocument) {

	let jsonObject = {};

	let summary = xmlDocument.documentElement.querySelectorAll("ResultSummary");
	jsonObject["resultSummary"] = {
		outcome: summary[0].getAttribute("outcome")
	};

	jsonObject["results"] = [];
	for (var item of xmlDocument.documentElement.querySelectorAll("Results>UnitTestResult")) {
		jsonObject["results"].push({
			testName: item.getAttribute("testName"),
			outcome: item.getAttribute("outcome"),
			testId: item.getAttribute("testId")
		});
	}

	return jsonObject;
}

export function updateTestRun(testRun) {
	app["testRun"] = testRun;
}
