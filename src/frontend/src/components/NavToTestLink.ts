import Vue from "vue";
import { callbacks } from "../index";
import { Fragment } from "vue-fragment";
import { Component, Prop } from "vue-property-decorator";
import { FASTTooltip } from "@microsoft/fast-components";

FASTTooltip;

@Component({
  components: {
    Fragment
  }
})
export default class NavToTestLink extends Vue {
  public name = "nav-to-test-link";

  private testNotFound = true;

  @Prop() readonly testId!: string
  @Prop() readonly testMethodName!: number

  private openTest() {
    callbacks.navToTestMethod(this.testId);
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
    callbacks.raiseTestMethodExists(this.testId);
  }

  public destroyed() {
    window.removeEventListener("message", this.onWindowMessage);
  }
}