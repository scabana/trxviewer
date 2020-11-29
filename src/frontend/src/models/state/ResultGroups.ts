import GroupState from "./GroupState";
import UnitTestResultState from "./UnitTestResultState";


export default interface ResultGroups {
	[groupId: string]: GroupState<UnitTestResultState>;
}
