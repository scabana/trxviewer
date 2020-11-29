import Vue from "vue";
import { FASTAccordion, FASTTextField } from "@microsoft/fast-components";
import UnitTestResultGroup from "./UnitTestResultGroup.vue";
import { getStyle } from "../utils/styles";
import { Component, Prop } from "vue-property-decorator";
import TestRun from "../models/trx/TestRun";
import TestRunState from "../models/state/TestRunState";
import GroupState from "../models/state/GroupState";
import UnitTestResultState from "../models/state/UnitTestResultState";
import { groupBy } from "../utils/objects";

FASTAccordion;
FASTTextField;

@Component({
	components: {
		UnitTestResultGroup
	}
})
export default class PartialList extends Vue {
	public name = "test-run";

	@Prop() readonly testRun!: TestRun
	@Prop() readonly testRunState!: TestRunState

	get groupedResults() {

		const results = [...this.testRun.results];

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

		return groupBy(results, item => item.outcome);
	}

	private getGroupState(state: string): GroupState<UnitTestResultState> {

		let groupState = this.testRunState.resultGroups[state];

		if (!groupState) {
			groupState = {
				expanded: {
					isExpanded: state == "Failed"
				},
				itemStates: {}
			};

			this.testRun.results.forEach(element => {
				if (element.outcome == state) {
					groupState.itemStates[element.testId] = {
						testId: element.testId,
						expanded: {
							isExpanded: false
						}
					};
				}
			});

			this.$set(this.testRunState.resultGroups, state, groupState);
		}

		return groupState;

	}

	private getStyle = getStyle
}