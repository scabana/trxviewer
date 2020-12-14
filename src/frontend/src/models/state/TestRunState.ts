import ResultGroups from "./ResultGroups";
import SummaryState from "./SummaryState";

interface TestRunState {
    filter: string;
    resultGroups: ResultGroups;
    summary: SummaryState
}

export default TestRunState;
