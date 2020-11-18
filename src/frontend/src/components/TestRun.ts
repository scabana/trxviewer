import Vue from "vue";
import { FASTAccordion, FASTTextField } from "@microsoft/fast-components";
import UnitTestResultGroup from "./UnitTestResultGroup.vue";
import { getStyle } from "../utils/styles";
import { Component, Prop } from "vue-property-decorator";
import TestRun from "../models/TestRun";

FASTAccordion;
FASTTextField;

@Component({
	components: {
		UnitTestResultGroup
	}
})
export default class PartialList extends Vue {
	public name = "test-run";

	private filter = "";

	@Prop() readonly testRun!: TestRun

	get groupedResults() {
		var groupBy = function (xs: any, key: string) {
			return xs.reduce(function (rv: any[], x: any) {
				(rv[x[key]] = rv[x[key]] || []).push(x);
				return rv;
			}, {});
		};

		let results = [...this.testRun.results];

		results.sort((left, right) => {
			if (left.outcome == right.outcome) {
				return left.testName.localeCompare(right.testName);
			}
			if (left.outcome === "Failed") {
				return -1;
			}
			if (right.outcome === "Failed") {
				return 1;
			}
			return left.outcome.localeCompare(right.outcome);
		});

		return groupBy(results, "outcome");
	}

	applyFilter(e: Event) {
		this.filter = (e.target as HTMLInputElement).value;
	}

	private getStyle = getStyle
}