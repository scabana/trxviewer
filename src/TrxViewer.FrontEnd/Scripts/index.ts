import { FASTDesignSystemProvider, FASTTextField, FASTAccordion, FASTAccordionItem } from "@microsoft/fast-components";

FASTDesignSystemProvider;
FASTTextField;
FASTAccordion;
FASTAccordionItem;

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
			let test = context.testResultXmlDocument.querySelector(`TestDefinitions > UnitTest[id = "${testId}"]`);
			let testMethod = test.querySelector("TestMethod");

			return {
				name: test.getAttribute("name"),
				testMethodClassName: testMethod.getAttribute("className"),
				testMethodName: testMethod.getAttribute("name"),
			}
		},
		getTestResultOutputModel: testId => {
			let errorInfo = context.testResultXmlDocument.querySelector(`Results > UnitTestResult[testId = "${testId}"] > Output > ErrorInfo`);

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

// function getTestRun() {
// 	return new Promise((resolve, reject) => {
// 		let fileInput = document.getElementsByTagName("input")[0];

// 		let fileRef = fileInput.files[0];

// 		var reader = new FileReader();
// 		reader.readAsText(fileRef, "UTF-8");

// 		reader.onload = function (evt) {
// 			return resolve(parseStringToTestResult(evt.target.result));
// 		}
// 	});
// }