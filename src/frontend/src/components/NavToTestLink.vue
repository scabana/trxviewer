<template>
  <fragment>
    <a v-if="!testNotFound" @click="openTest" href="#">{{ testMethodName }} </a>
    <span v-if="testNotFound" href="#" :id="`navToTest${testId}`">{{ testMethodName }} </span>
    <fast-tooltip v-if="testNotFound" :anchor="`navToTest${testId}`">{{ $t("Test_method_not_found") }}</fast-tooltip>
  </fragment>
</template>
<i18n lang="yml">
en:
  Test_method_not_found: Test method not found
fr:
  Test_method_not_found: Méthode non trouvée
</i18n>
<script lang="ts">
import Vue from "vue";
import { Fragment } from "vue-fragment";
import { Component, Prop } from "vue-property-decorator";
import { FASTTooltip } from "@microsoft/fast-components";

FASTTooltip;

@Component({
  components: {
    Fragment,
  },
})
export default class NavToTestLink extends Vue {
  public name = "nav-to-test-link";

  private testNotFound = true;

  @Prop() readonly testId!: string;
  @Prop() readonly testMethodName!: number;

  private openTest() {
    this.$root.navToTestMethod(this.testId);
  }

  private onWindowMessage(event: any) {
    if (event.data.type === "testMethodFound") {
      if (event.data.testId === this.testId) {
        window.removeEventListener("message", this.onWindowMessage);
        this.testNotFound = false;
      }
    }
  }

  public created() {
    window.addEventListener("message", this.onWindowMessage);
    this.$root.raiseTestMethodExists(this.testId);
  }

  public destroyed() {
    window.removeEventListener("message", this.onWindowMessage);
  }
}
</script>
