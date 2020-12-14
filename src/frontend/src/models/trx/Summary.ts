import RunInfo from "./RunInfo";

interface Summary {
    outcome: string;
    counters: {
        total: number;
        executed: number;
        passed: number;
        failed: number;
    },
    runInfos: RunInfo[];
}

export default Summary;
