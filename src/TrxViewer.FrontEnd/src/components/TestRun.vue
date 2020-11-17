<template>
  <div>
    <div>
      <h3>
        Outcome: <span :style="getStyle(testRun.resultSummary.outcome)">{{ testRun.resultSummary.outcome }}</span>
      </h3>
    </div>
    <div>
      <fast-text-field @change="applyFilter" placeholder="Filter" style="display: block"> </fast-text-field>
      <fast-accordion>
        <unit-test-result-group v-for="(val, key) in groupedResults" :key="key" :result="key" :items="val" :filter="filter"></unit-test-result-group>
      </fast-accordion>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { FASTAccordion, FASTTextField } from "@microsoft/fast-components";
import UnitTestResultGroup from "./UnitTestResultGroup.vue";
import { getStyle } from "../utils/styles";

FASTAccordion;
FASTTextField;

export default Vue.extend({
  name: "test-run",
  data: function () {
    return {
      filter: "",
    };
  },
  computed: {
    groupedResults() {
      var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };

      let results = [...this.testRun.results];

      results.sort((left, right) => {
        if (left.outcome == right.outcome) {
          return left.testName.localeCompare(right.testName);
        }
        if (left.outcome === "Failed") {
          return -1;
        }
        if (right.outcome === "Failed") {
          return 1;
        }
        return left.outcome.localeCompare(right.outcome);
      });

      return groupBy(results, "outcome");
    },
  },
  methods: {
    applyFilter(e: Event) {
      this.filter = (e.target as HTMLInputElement).value;
    },
    getStyle,
  },
  props: {
    testRun: Object,
  },
  components: {
    UnitTestResultGroup,
  },
});
</script>