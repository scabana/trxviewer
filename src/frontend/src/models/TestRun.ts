import UnitTestResult from "./UnitTestResult";
import ResultSummary from "./ResultSummary";

export default interface TestRun {
	resultSummary: ResultSummary;
	results: UnitTestResult[];
}
