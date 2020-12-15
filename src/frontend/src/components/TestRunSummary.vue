<template>
  <fast-accordion>
    <fast-accordion-item @change="onAccordionItemChanged" ref="accordionItem" :expanded="summaryState.expanded.isExpanded">
      <h3 slot="heading">
        {{ $t("Outcome") }}: <span :style="getStyle(summary.outcome)">{{ $t(`testResult.${summary.outcome}`, { fallback: summary.outcome }) }}</span>
      </h3>
      <div>
        <div id="time">{{ $t("Time") }}: {{ $d(timeStamp, "long") }}</div>
        <div id="countersTotal">{{ $t("Total") }}: {{ summary.counters.total }}</div>
        <div id="countersExecuted">{{ $t("Executed") }}: {{ summary.counters.executed }}</div>
        <div id="countersPassed">{{ $t("testResult.Passed") }}: {{ summary.counters.passed }}</div>
        <div id="countersFailed">{{ $t("Failed") }}: {{ summary.counters.failed }}</div>
      </div>
    </fast-accordion-item>
  </fast-accordion>
</template>
<i18n src="../i18n.yml" lang="yml"></i18n>
<i18n lang="yml">
en:
  Time: Time
  Total: Total
  Executed: Executed
  Failed: Failed
fr:
  Time: Momment d'éxécution
  Executed: Réalisés
  Failed: Échoués
</i18n>
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
    return this.summary.runInfos?.[0]?.timeStamp;
  }

  private onAccordionItemChanged() {
    const accordionItem = this.$refs.accordionItem as FASTAccordionItem;

    this.summaryState.expanded.isExpanded = accordionItem.expanded;
  }

  private getStyle = getOutcomeStyle;
}
</script>
