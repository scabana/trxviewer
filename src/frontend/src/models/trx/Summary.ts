import Counters from "./Counters";
import RunInfo from "./RunInfo";

interface Summary {
    outcome: string;
    counters: Counters,
    runInfos: RunInfo[];
}

export default Summary;
