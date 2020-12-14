import TestResultOutputModel from "../models/state/TestResultOutputModel";
import TestModel from "../models/trx/TestModel";
import TestRun from "../models/trx/TestRun";

export function getTestRun(xmlDocument: Document): TestRun {

    const summary = xmlDocument.documentElement.querySelector("ResultSummary");
    const counters = summary?.querySelector("Counters");

    const jsonObject: TestRun = {
        summary: {
            outcome: summary?.getAttribute("outcome") || "",
            counters: {
                executed: Number.parseInt(counters?.getAttribute("executed") || "0"),
                failed: Number.parseInt(counters?.getAttribute("failed") || "0"),
                passed: Number.parseInt(counters?.getAttribute("passed") || "0"),
                total: Number.parseInt(counters?.getAttribute("total") || "0")
            },
            runInfos: [{ timeStamp: new Date(summary?.querySelector("RunInfos>RunInfo")?.getAttribute("timestamp") || new Date()) }],
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

export function getTestModel(xmlDocument: Document | null, testId: string): TestModel {
    const test = xmlDocument?.querySelector(`TestDefinitions>UnitTest[id="${testId}"]`);
    const testMethod = test?.querySelector("TestMethod");

    return {
        name: test?.getAttribute("name") || "",
        testMethodClassName: testMethod?.getAttribute("className") || "",
        testMethodName: testMethod?.getAttribute("name") || ""
    };
}

export function getTestResultOutputModel(xmlDocument: Document | null, testId: string): TestResultOutputModel | null {
    const errorInfo = xmlDocument?.querySelector(`Results>UnitTestResult[testId="${testId}"] > Output > ErrorInfo`);

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
