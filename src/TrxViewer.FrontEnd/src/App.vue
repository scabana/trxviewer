<template>
  <test-run v-if="$root.testRun" :testRun="$root.testRun"></test-run>
</template>
<script lang="ts">
import Vue from "vue";
import TestRun from "./components/TestRun.vue";

export default Vue.extend({
  name: "app",
  components: {
    TestRun,
  },
});
</script>