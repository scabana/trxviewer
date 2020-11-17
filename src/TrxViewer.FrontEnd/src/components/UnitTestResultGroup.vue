<template>
  <fast-accordion-item :expanded="expanded">
    <span slot="heading" :style="getStyle(result)">{{ result }}</span>
    <div style="display: flex; flex-direction: column; width: 100%">
      <filtered-results :items="items" :filter="filterCallback">
        <template v-slot:default="filtered">
          <partial-list :items="filtered.filteredItems">
            <template v-slot:default="partial">
              <fast-accordion>
                <unit-test-result v-for="item of partial.filteredItems" v-bind:key="item.testId" :item="item" />
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
import FilteredResults from "./FilteredResults.vue";
import PartialList from "./PartialList.vue";
import { getStyle } from "../utils/styles";
import { FASTButton, FASTAccordion, FASTAccordionItem } from "@microsoft/fast-components";

FASTButton;
FASTAccordion;
FASTAccordionItem;

export default Vue.extend({
  name: "unit-test-result-group",
  data: function () {
    return {
      expanded: this.result === "Failed" ? "expanded" : undefined,
    };
  },
  props: {
    result: String,
    filter: String,
    items: Array,
  },
  computed: {
    filterCallback() {
      let filter = this.filter;

      return (input) => input.testName.toLowerCase().indexOf(filter) >= 0;
    },
  },
  methods: {
    getStyle,
  },
  components: {
    UnitTestResult,
    FilteredResults,
    PartialList,
  },
});
</script>
