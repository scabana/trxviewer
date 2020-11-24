
import Vue from "vue";
import UnitTestResult from "./UnitTestResult.vue";
import UnitTestResultModel from "../models/UnitTestResult";
import FilteredResults from "./FilteredResults.vue";
import PartialList from "./PartialList.vue";
import { getStyle } from "../utils/styles";
import { FASTButton, FASTAccordion, FASTAccordionItem } from "@microsoft/fast-components";
import { Component, Prop } from "vue-property-decorator";

FASTButton;
FASTAccordion;
FASTAccordionItem;

@Component({
  components: {
    UnitTestResult,
    FilteredResults,
    PartialList,
  }
})
export default class UnitTestResultGroup extends Vue {
  public name = "unit-test-result-group";

  @Prop() readonly result!: string
  @Prop() readonly filter!: string
  @Prop() readonly items!: UnitTestResult[]

  get filterCallback() {
    const filter = this.filter;

    return (input: UnitTestResultModel) => input.testName.toLowerCase().indexOf(filter) >= 0;
  }

  get expanded() {
    return this.result === "Failed" ? "expanded" : undefined;
  }

  private getStyle = getStyle
}
