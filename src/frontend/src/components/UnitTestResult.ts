import Vue from "vue";
import UnitTestResultModel from "../models/UnitTestResult"
import { callbacks } from "../index";
import { FASTAccordionItem } from "@microsoft/fast-components";
import { Component, Prop } from "vue-property-decorator";
import { TestResultOutputModel } from "../models/TestResultOutputModel";
import TestModel from "../models/TestModel";
import NavToTestLink from "./NavToTestLink.vue";

FASTAccordionItem;

@Component({
  components: {
    NavToTestLink
  }
})
export default class UnitTestResult extends Vue {
  public name = "unit-test-result";

  private expandedOnce = false;
  private output: TestResultOutputModel | null = null;
  private testModel: TestModel | null = null;

  @Prop() readonly item!: UnitTestResultModel

  private loadTestResult() {

    if (this.expandedOnce === true) {
      return;
    }
    this.expandedOnce = true;

    this.testModel = callbacks.getTestModel(this.item.testId);
    this.output = callbacks.getTestResultOutputModel(this.item.testId);
  }
}