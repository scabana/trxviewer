import UnitTestResult from "./UnitTestResult";
import Summary from "./Summary";

interface TestRun {
    summary: Summary;
    results: UnitTestResult[];
}

export default TestRun;
