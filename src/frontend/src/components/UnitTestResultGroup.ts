import Vue from "vue";
import UnitTestResult from "./UnitTestResult.vue";
import UnitTestResultModel from "../models/trx/UnitTestResult";
import FilteredResults from "./FilteredResults.vue";
import PartialList from "./PartialList.vue";
import { getStyle } from "../utils/styles";
import { FASTButton, FASTAccordion, FASTAccordionItem } from "@microsoft/fast-components";
import { Component, Prop } from "vue-property-decorator";
import GroupState from "../models/state/GroupState";
import UnitTestResultState from "../models/state/UnitTestResultState";

FASTButton;
FASTAccordion;
FASTAccordionItem;

@Component({
    components: {
        UnitTestResult,
        FilteredResults,
        PartialList,
    }
})
export default class UnitTestResultGroup extends Vue {
    public name = "unit-test-result-group";

    @Prop() readonly result!: string
    @Prop() readonly filter!: string
    @Prop() readonly items!: UnitTestResultModel[]
    @Prop() readonly itemStates!: GroupState<UnitTestResultState>

    get filterCallback() {
        const filter = this.filter;

        return (input: UnitTestResultModel) => input.testName.toLowerCase().indexOf(filter) >= 0;
    }

    get expanded() {
        return this.itemStates.expanded.isExpanded;
    }

    private getItemState(item: UnitTestResultModel): UnitTestResultState {
        return this.itemStates.itemStates[item.testId];
    }

    private onAccordionItemChanged() {
        const accordionItem = this.$refs.accordionItem as FASTAccordionItem;

        this.itemStates.expanded.isExpanded = accordionItem.expanded;
    }

    private getStyle = getStyle
}
