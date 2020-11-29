import ExpandedState from "./ExpandedState";
import ItemStates from "./ItemStates";

interface GroupState<TItem> {
	expanded: ExpandedState;
	itemStates: ItemStates<TItem>;
}

export default GroupState;
