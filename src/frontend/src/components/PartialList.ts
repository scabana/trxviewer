import Vue from "vue";
import { FASTButton } from "@microsoft/fast-components";
import { Fragment } from "vue-fragment";
import { Component, Prop } from 'vue-property-decorator';

FASTButton;

const itemPerLoad = 50;

@Component({
  components: {
    Fragment,
  }
})
export default class PartialList extends Vue {
  public name = "partial-list";

  private renderedCount = itemPerLoad;

  @Prop() readonly items!: any[]

  get filteredItems() {
    const items = [...this.items];
    return items.slice(0, this.renderedCount);
  }

  private showMore() {
    this.renderedCount += itemPerLoad;
  }
}