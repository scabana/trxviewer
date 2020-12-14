<template>
  <fast-accordion>
    <fast-accordion-item @change="onAccordionItemChanged" ref="accordionItem" :expanded="summaryState.expanded.isExpanded">
      <h3 slot="heading">
        Outcome: <span :style="getStyle(summary.outcome)">{{ summary.outcome }}</span>
      </h3>
      <div>
        <div id="time">Time: {{ timeStamp }}</div>
        <div id="countersTotal">Total: {{ summary.counters.total }}</div>
        <div id="countersExecuted">Executed: {{ summary.counters.executed }}</div>
        <div id="countersPassed">Passed: {{ summary.counters.passed }}</div>
        <div id="countersFailed">Failed: {{ summary.counters.failed }}</div>
      </div>
    </fast-accordion-item>
  </fast-accordion>
</template>
<script lang="ts">
import Vue from "vue";
import { FASTAccordion, FASTAccordionItem } from "@microsoft/fast-components";
import { getOutcomeStyle } from "../utils/styles";
import { Component, Prop } from "vue-property-decorator";
import SummaryState from "../models/state/SummaryState";
import TrxSummary from "../models/trx/Summary";

FASTAccordion;
FASTAccordionItem;

@Component({})
export default class TestRunSummary extends Vue {
  public name = "test-run-summary";

  @Prop() readonly summary!: TrxSummary;
  @Prop() readonly summaryState!: SummaryState;

  get timeStamp() {
    return this.summary.runInfos?.[0]?.timeStamp?.toLocaleString();
  }

  private onAccordionItemChanged() {
    const accordionItem = this.$refs.accordionItem as FASTAccordionItem;

    this.summaryState.expanded.isExpanded = accordionItem.expanded;
  }

  private getStyle = getOutcomeStyle;
}
</script>
