import UnitTestResult from "./UnitTestResult";
import ResultSummary from "./ResultSummary";

interface TestRun {
    resultSummary: ResultSummary;
    results: UnitTestResult[];
}

export default TestRun;
