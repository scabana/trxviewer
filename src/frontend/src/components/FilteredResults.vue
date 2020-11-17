<template>
  <fragment>
    <slot :filteredItems="filteredItems"></slot>
  </fragment>
</template>
<script lang="ts">
import Vue from "vue";
import { context } from "../index";
import { Fragment } from "vue-fragment";
export default Vue.extend({
  name: "filtered-results",
  props: {
    items: Object,
    filter: Function,
  },
  computed: {
    filteredItems() {
      return [...this.items].filter(this.filter as (value) => Boolean);
    },
  },
  components: {
    Fragment,
  },
});
</script>