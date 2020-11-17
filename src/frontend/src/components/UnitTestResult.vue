<template>
  <fast-accordion-item @change="loadTestResult">
    <span slot="heading">{{ item.testName }}</span>
    <div v-if="expandedOnce">
      <div>
        <span>Class name:</span>
        <span>{{ testModel.testMethodClassName }}</span>
      </div>
      <div>
        <span>Method name:</span>
        <a @click="openTest" href="#">{{ testModel.testMethodName }}</a>
      </div>
      <div v-if="output && output.errorInfo && output.errorInfo.message">
        <div>Message:</div>
        <pre>{{ output.errorInfo.message }}</pre>
      </div>
      <div v-if="output && output.errorInfo && output.errorInfo.stackTrace">
        <div>Stack Trace:</div>
        <pre>{{ output.errorInfo.stackTrace }}</pre>
      </div>
    </div>
  </fast-accordion-item>
</template>
<script lang="ts">
import Vue from "vue";
import { context } from "../index";
import { FASTAccordionItem } from "@microsoft/fast-components";

FASTAccordionItem;

export default Vue.extend({
  name: "unit-test-result",
  props: {
    item: Object,
  },
  data: () => {
    return {
      output: null,
      expandedOnce: false,
      testModel: null,
    };
  },
  methods: {
    loadTestResult() {
      this.expandedOnce = true;

      if (this.output) {
        return;
      }
      this.testModel = context.blazorCallbacks.getTestModel(this.item.testId);
      this.output = context.blazorCallbacks.getTestResultOutputModel(this.item.testId);
    },
    openTest() {
      this.testModel = context.blazorCallbacks.navToTestMethod(this.item.testId);
    },
  },
});
</script>