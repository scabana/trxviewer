import GroupState from "./GroupState";
import UnitTestResultState from "./UnitTestResultState";

interface ResultGroups {
	[groupId: string]: GroupState<UnitTestResultState>;
}

export default ResultGroups;