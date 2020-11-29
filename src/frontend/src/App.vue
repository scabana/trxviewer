<template>
  <fast-design-system-provider use-defaults ref="designSystem">
    <test-run v-if="$root.testRun" :testRun="$root.testRun" :testRunState="$root.testRunState"></test-run>
  </fast-design-system-provider>
</template>
<script lang="ts">
import { createColorPalette, FASTDesignSystemProvider, parseColorString } from "@microsoft/fast-components";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TestRun from "./components/TestRun.vue";

FASTDesignSystemProvider;

@Component({
  components: {
    TestRun,
  },
})
export default class App extends Vue {
  public name = "app";

  public mounted() {
    const designSystem = this.$refs.designSystem as FASTDesignSystemProvider;

    document.documentElement.style.setProperty("--background-color", designSystem.backgroundColor);
  }

  @Watch("$root.theme", { immediate: true })
  public OnThemeChanged() {
    if (this.$root.theme === null) {
      return;
    }

    const designSystem = this.$refs.designSystem as FASTDesignSystemProvider;
    const accentColor = this.$root.theme.accentColor;
    const backgroundColor = this.$root.theme.backgroundColor;

    if (designSystem.accentBaseColor != accentColor) {
      designSystem.accentBaseColor = accentColor;
      designSystem.accentPalette = createColorPalette(parseColorString(accentColor));
    }
    if (designSystem.backgroundColor != backgroundColor) {
      designSystem.backgroundColor = backgroundColor;
      designSystem.neutralPalette = createColorPalette(parseColorString(backgroundColor));
    }

    if (document.documentElement.style.getPropertyValue("--background-color") != designSystem.backgroundColor) {
      document.documentElement.style.setProperty("--background-color", designSystem.backgroundColor);
    }
  }
}
</script>