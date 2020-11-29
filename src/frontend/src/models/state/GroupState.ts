import ExpandedState from "./ExpandedState";
import ItemStates from "./ItemStates";

export default interface GroupState<TItem> {
	expanded: ExpandedState;
	itemStates: ItemStates<TItem>;
}
