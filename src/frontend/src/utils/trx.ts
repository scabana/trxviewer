import TestRun from "../models/trx/TestRun";

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
			testName: item.getAttribute("testName") || "",
			outcome: item.getAttribute("outcome") || "",
			testId: item.getAttribute("testId") || ""
		});
	}

	return jsonObject;
}

export function parseStringXml(string: string) {
	let parser = new DOMParser();
	return parser.parseFromString(string, "application/xml");
}
