
export let context = {
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
			let errorInfo = context.testResultXmlDocument.querySelector(`Results>UnitTestResult[testId="${testId}"]>Output>ErrorInfo`);

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

context.window.blazorCallbacks = context.blazorCallbacks;

context.window.document.addEventListener("readystatechange", () => {
	document.documentElement.style.setProperty('--background-color', document.getElementsByTagName("fast-design-system-provider")[0].backgroundColor);
});

export function parseStringXml(string) {
	let parser = new DOMParser();
	return parser.parseFromString(string, "application/xml");
}

export function parseStringToTestResult(xmlDocument) {

	let jsonObject = {};

	let summary = xmlDocument.documentElement.querySelectorAll("ResultSummary");
	jsonObject.ResultSummary = {
		"Outcome": summary[0].getAttribute("outcome")
	};

	jsonObject.Results = [];
	for (var item of xmlDocument.documentElement.querySelectorAll("Results>UnitTestResult")) {
		jsonObject.Results.push({
			"TestName": item.getAttribute("testName"),
			"Outcome": item.getAttribute("outcome"),
			"TestId": item.getAttribute("testId")
		});
	}

	return jsonObject;
}

function getTestRun() {
	return new Promise((resolve, reject) => {
		let fileInput = document.getElementsByTagName("input")[0];

		let fileRef = fileInput.files[0];

		var reader = new FileReader();
		reader.readAsText(fileRef, "UTF-8");

		reader.onload = function (evt) {
			return resolve(parseStringToTestResult(evt.target.result));
		}
	});
}