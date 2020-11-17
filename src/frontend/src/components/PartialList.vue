<template>
  <fragment>
    <slot :filteredItems="filteredItems"></slot>
    <fast-button v-if="items.length > renderedCount" @click="showMore">Show more</fast-button>
  </fragment>
</template>
<script lang="ts">
import Vue from "vue";
import { FASTButton } from "@microsoft/fast-components";
import { context } from "../index";
import { Fragment } from "vue-fragment";

FASTButton;

const itemPerLoad = 50;

export default Vue.extend({
  name: "partial-list",
  props: {
    items: Object,
  },
  data: function () {
    return {
      renderedCount: itemPerLoad,
    };
  },
  methods: {
    showMore() {
      this.renderedCount += itemPerLoad;
    },
  },
  computed: {
    filteredItems() {
      let items = [...this.items];
      return items.slice(0, this.renderedCount);
    },
  },
  components: {
    Fragment,
  },
});
</script>