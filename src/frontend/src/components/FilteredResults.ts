import Vue from "vue";
import { Fragment } from "vue-fragment";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    Fragment,
  }
})
export default class FilteredResults extends Vue {
  public name = "filtered-results";

  @Prop() readonly items!: any[]
  @Prop() readonly filter!: Function

  get filteredItems() {
    return [...this.items].filter(this.filter as (value: any) => Boolean);
  }
}
