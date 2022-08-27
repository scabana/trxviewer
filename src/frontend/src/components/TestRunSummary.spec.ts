import { AccordionItem } from '@microsoft/fast-components';
import { shallowMount } from '@vue/test-utils';

import i18n from '../utils/i18n';
import TestRunSummary from './TestRunSummary.vue';

describe("TestRunSummary.vue", () => {
    test("Test run outcome is shown", () => {
        const summary = {
            outcome: "Failed",
            counters: {
                total: 1,
                executed: 2,
                passed: 3,
                failed: 4
            },
            runInfos: [
                {
                    timeStamp: new Date()
                }
            ]
        };

        const summaryState = {
            expanded: {
                isExpanded: false
            }
        };

        const wrapper = shallowMount(TestRunSummary, {
            propsData: { summary, summaryState },
            i18n
        });

        expect(wrapper.find("span").text()).toBe(summary.outcome);
    });

    test("Summary is loaded correctly", () => {
        const summary = {
            outcome: "Failed",
            counters: {
                total: 1,
                executed: 2,
                passed: 3,
                failed: 4
            },
            runInfos: [
                {
                    timeStamp: new Date()
                }
            ]
        };

        const summaryState = {
            expanded: {
                isExpanded: false
            }
        };

        const wrapper = shallowMount(TestRunSummary, {
            propsData: { summary, summaryState },
            i18n
        });

        expect(wrapper.find("#time").text()).toBe(`Time: ${wrapper.vm.$d(summary.runInfos[0].timeStamp, "long")}`);
        expect(wrapper.find("#countersTotal").text()).toBe(`Total: ${summary.counters.total}`);
        expect(wrapper.find("#countersExecuted").text()).toBe(`Executed: ${summary.counters.executed}`);
        expect(wrapper.find("#countersPassed").text()).toBe(`Passed: ${summary.counters.passed}`);
        expect(wrapper.find("#countersFailed").text()).toBe(`Failed: ${summary.counters.failed}`);
    });

    test("Summary is not expanded when state says it should not be.", () => {
        const testId = "testId";
        const summary = {
            outcome: "Failed",
            counters: {
                total: 1,
                executed: 2,
                passed: 3,
                failed: 4
            },
            runInfos: [
                {
                    timeStamp: new Date()
                }
            ]
        };

        const summaryState = {
            expanded: {
                isExpanded: false
            }
        };

        const wrapper = shallowMount(TestRunSummary, {
            propsData: { summary, summaryState },
            i18n
        });

        expect(wrapper.find("fast-accordion-item[expanded=false]").exists()).toBeFalsy();
    });

    test("Summary is expanded when state says it should be.", () => {
        const testId = "testId";
        const summary = {
            outcome: "Failed",
            counters: {
                total: 1,
                executed: 2,
                passed: 3,
                failed: 4
            },
            runInfos: [
                {
                    timeStamp: new Date()
                }
            ]
        };

        const summaryState = {
            expanded: {
                isExpanded: true
            }
        };

        const wrapper = shallowMount(TestRunSummary, {
            propsData: { summary, summaryState },
            i18n
        });

        expect(wrapper.find("fast-accordion-item[expanded=true]").exists()).toBeTruthy();
    });

    test("When filter is updated, it gets reflected in the testRunState", async () => {
        const testId = "testId";
        const summary = {
            outcome: "Failed",
            counters: {
                total: 1,
                executed: 2,
                passed: 3,
                failed: 4
            },
            runInfos: [
                {
                    timeStamp: new Date()
                }
            ]
        };

        const summaryState = {
            expanded: {
                isExpanded: false
            }
        };

        const wrapper = shallowMount(TestRunSummary, {
            propsData: { summary, summaryState },
            i18n
        });

        //For some reason, was not able to get a simple click event to register, just setting
        //expanded was not enough to trigger the change event. But both does seem to get us
        //to the right state.
        (wrapper.find("fast-accordion-item").element as AccordionItem).expanded = true;
        wrapper.find("fast-accordion-item").trigger("change");
        await wrapper.vm.$nextTick();

        expect(summaryState.expanded.isExpanded).toBe(true);
    });
});
