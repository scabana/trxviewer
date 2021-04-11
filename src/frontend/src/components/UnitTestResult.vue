<template>
  <fast-accordion-item @change="onAccordionItemChanged" ref="accordionItem" :expanded="itemState.expanded.isExpanded">
    <span slot="heading">{{ item.testName }}</span>
    <div v-if="expandedOnce" style="overflow-x: auto">
      <div name="classname">
        <span class="title">{{ $t("ClassName") }}:</span>
        <span>{{ testModel.testMethodClassName }}</span>
      </div>
      <div name="methodname">
        <span class="title">{{ $t("MethodName") }}:</span>
        <nav-to-test-link :testId="item.testId" :testMethodName="testModel.testMethodName"></nav-to-test-link>
      </div>
      <div name="stdOut" v-if="output && output.stdOut">
        <span class="title">{{ $t("StdOut") }}:</span>
        <pre>{{ output.stdOut }}</pre>
      </div>
      <div name="errorinfomessage" v-if="output && output.errorInfo && output.errorInfo.message">
        <div class="title">{{ $t("ErrorMessage") }}:</div>
        <pre>{{ output.errorInfo.message }}</pre>
      </div>
      <div name="errorinfostacktrace" v-if="output && output.errorInfo && output.errorInfo.stackTrace">
        <div class="title">{{ $t("StackTrace") }}:</div>
        <pre>{{ output.errorInfo.stackTrace }}</pre>
      </div>
    </div>
  </fast-accordion-item>
</template>
<i18n lang="yml">
en:
  ClassName: Class name
  MethodName: Method name
  ErrorMessage: Error message
  StackTrace: Stack Trace
  StdOut: Standard output
fr:
  ClassName: Nom de la classe
  MethodName: Nom de la méthode
  ErrorMessage: Message d'erreur
  StackTrace: Pile d'exception
  StdOut: Sortie standard
</i18n>
<script lang="ts">
import Vue from "vue";
import UnitTestResultModel from "../models/trx/UnitTestResult";
import { FASTAccordionItem } from "@microsoft/fast-components";
import { Component, Prop } from "vue-property-decorator";
import TestResultOutputModel from "../models/state/TestResultOutputModel";
import TestModel from "../models/trx/TestModel";
import NavToTestLink from "./NavToTestLink.vue";
import UnitTestResultState from "../models/state/UnitTestResultState";
import { getTestModel, getTestResultOutputModel } from "../AppContext";

FASTAccordionItem;

@Component({
  components: {
    NavToTestLink
  }
})
export default class UnitTestResult extends Vue {
  public name = "unit-test-result";

  private expandedOnce = false;
  private output: TestResultOutputModel | null = null;
  private testModel: TestModel | null = null;

  @Prop() readonly item!: UnitTestResultModel;
  @Prop() readonly itemState!: UnitTestResultState;

  public created() {
    if (this.itemState.expanded.isExpanded === true) {
      this.loadTestResult();
    }
  }

  private onAccordionItemChanged() {
    const accordionItem = this.$refs.accordionItem as FASTAccordionItem;

    this.itemState.expanded.isExpanded = accordionItem.expanded;

    this.loadTestResult();
  }

  private loadTestResult() {
    if (this.expandedOnce === true) {
      return;
    }
    this.expandedOnce = true;

    this.testModel = getTestModel(this.item.testId);
    this.output = getTestResultOutputModel(this.item.testId);
  }
}
</script>
