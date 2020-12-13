<template>
  <fast-accordion-item :expanded="expanded" ref="accordionItem" @change="onAccordionItemChanged" class="group">
    <span slot="heading" :style="getStyle(result)">{{ result }}</span>
    <span slot="end" style="float:right">{{items.length}} items</span>
    <div style="display: flex; flex-direction: column; width: 100%">
      <filtered-results :items="items" :filter="filterCallback">
        <template v-slot:default="filtered">
          <partial-list :items="filtered.filteredItems">
            <template v-slot:default="partial">
              <fast-accordion>
                <unit-test-result v-for="item of partial.filteredItems" v-bind:key="item.testId" :item="item" :itemState="getItemState(item)" />
              </fast-accordion>
            </template>
          </partial-list>
        </template>
      </filtered-results>
    </div>
  </fast-accordion-item>
</template>
<script lang="ts">
import Vue from "vue";
import UnitTestResult from "./UnitTestResult.vue";
import UnitTestResultModel from "../models/trx/UnitTestResult";
import FilteredResults from "./FilteredResults.vue";
import PartialList from "./PartialList.vue";
import { getOutcomeStyle } from "../utils/styles";
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
  },
})
export default class UnitTestResultGroup extends Vue {
  public name = "unit-test-result-group";

  @Prop() readonly result!: string;
  @Prop() readonly filter!: string;
  @Prop() readonly items!: UnitTestResultModel[];
  @Prop() readonly groupState!: GroupState<UnitTestResultState>;

  get filterCallback() {
    const filter = this.filter;

    return (input: UnitTestResultModel) => input.testName.toLowerCase().indexOf(filter) >= 0;
  }

  get expanded() {
    return this.groupState.expanded.isExpanded;
  }

  private getItemState(item: UnitTestResultModel): UnitTestResultState {
    return this.groupState.itemStates[item.testId];
  }

  private onAccordionItemChanged() {
    const accordionItem = this.$refs.accordionItem as FASTAccordionItem;

    this.groupState.expanded.isExpanded = accordionItem.expanded;
  }

  private getStyle = getOutcomeStyle;
}
</script>
