<template>
  <div>
    <test-run-summary :summary="testRun.summary" :summaryState="testRunState.summary"></test-run-summary>
    <div>
      <fast-text-field :value="testRunState.filter" v-on:input="testRunState.filter = $event.target.value" placeholder="Filter" style="display: block"> </fast-text-field>
      <fast-accordion>
        <unit-test-result-group v-for="(val, key) in groupedResults" :key="key" :result="key" :items="val" :filter="testRunState.filter" :groupState="getGroupState(key)"></unit-test-result-group>
      </fast-accordion>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { FASTTextField } from "@microsoft/fast-components";
import UnitTestResultGroup from "./UnitTestResultGroup.vue";
import TestRunSummary from "./TestRunSummary.vue";
import { Component, Prop } from "vue-property-decorator";
import TestRun from "../models/trx/TestRun";
import TestRunState from "../models/state/TestRunState";
import GroupState from "../models/state/GroupState";
import UnitTestResultState from "../models/state/UnitTestResultState";
import { groupBy } from "../utils/objects";

FASTTextField;

@Component({
  components: {
    UnitTestResultGroup,
    TestRunSummary,
  },
})
export default class PartialList extends Vue {
  public name = "test-run";

  @Prop() readonly testRun!: TestRun;
  @Prop() readonly testRunState!: TestRunState;

  get groupedResults() {
    const results = [...this.testRun.results];

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

    return groupBy(results, (item) => item.outcome);
  }

  private getGroupState(state: string): GroupState<UnitTestResultState> {
    let groupState = this.testRunState.resultGroups[state];

    if (!groupState) {
      groupState = {
        expanded: {
          isExpanded: state == "Failed",
        },
        itemStates: {},
      };

      this.testRun.results.forEach((element) => {
        if (element.outcome == state) {
          groupState.itemStates[element.testId] = {
            testId: element.testId,
            expanded: {
              isExpanded: false,
            },
          };
        }
      });

      this.$set(this.testRunState.resultGroups, state, groupState);
    }

    return groupState;
  }
}
</script>
