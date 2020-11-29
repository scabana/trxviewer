import TestRun from "../models/trx/TestRun";

export function parseDocumentToTestRun(xmlDocument: Document) {

	const summary = xmlDocument.documentElement.querySelector("ResultSummary");

	const jsonObject: TestRun = {
		resultSummary: {
			outcome: summary?.getAttribute("outcome") || ""
		},
		results: []
	};

	for (const item of Array.from(xmlDocument.documentElement.querySelectorAll("Results>UnitTestResult"))) {
		jsonObject.results.push({
			testName: item.getAttribute("testName") || "",
			outcome: item.getAttribute("outcome") || "",
			testId: item.getAttribute("testId") || ""
		});
	}

	return jsonObject;
}

export function parseStringXml(string: string) {
	const parser = new DOMParser();
	return parser.parseFromString(string, "application/xml");
}
