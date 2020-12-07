import { shallowMount } from '@vue/test-utils';
import TestRun from './TestRun.vue';

describe('TestRun.vue', () => {

    test('Test run outcome is shown', () => {
        const testRun = {
            resultSummary: {
                outcome: "Failed"
            },
            results: []
        };

        const testRunState = {

        };

        const wrapper = shallowMount(TestRun, {
            propsData: { testRun, testRunState }
        });

        expect(wrapper.find("span").text()).toBe(testRun.resultSummary.outcome);
    });

    test('Filter initial state is empty', () => {
        const testRun = {
            resultSummary: {
                outcome: "Failed"
            },
            results: []
        };

        const testRunState = {
        };

        const wrapper = shallowMount(TestRun, {
            propsData: { testRun, testRunState }
        });

        expect(wrapper.find("fast-text-field").attributes("value")).toBeUndefined();
    });

    test('Correct number of test groups generated', () => {
        const testRun = {
            resultSummary: {
                outcome: "Failed"
            },
            results: [
                { outcome: "Failed", testName: "1" },
                { outcome: "Success", testName: "2" }
            ]
        };

        const testRunState = {
            filter: "test filter",
            resultGroups: {}
        };

        const wrapper = shallowMount(TestRun, {
            propsData: { testRun, testRunState }
        });

        expect(wrapper.findAll("unit-test-result-group-stub").length).toBe(2);
    });

    test('Failed group is expanded by default.', () => {
        const testId = "testId";
        const testRun = {
            resultSummary: {
                outcome: "Failed"
            },
            results: [
                { outcome: "Failed", testName: "1", testId: testId }
            ]
        };

        const testRunState = {
            filter: "test filter",
            resultGroups: {}
        };

        const wrapper = shallowMount(TestRun, {
            propsData: { testRun, testRunState }
        });

        expect((wrapper.find("unit-test-result-group-stub").vm as any).groupState.expanded.isExpanded).toBe(true);
    });

    test('When filter is updated, it gets reflected in the testRunState', async () => {
        const newFilter = "new filter!";
        const testRun = {
            resultSummary: {
                outcome: "Failed"
            },
            results: []
        };

        const testRunState = {
            filter: "",
            resultGroups: {}
        };

        const wrapper = shallowMount(TestRun, {
            propsData: { testRun, testRunState }
        });


        wrapper.find("fast-text-field").element.setAttribute("value", newFilter);
        await wrapper.find("fast-text-field").trigger("input");

        expect(testRunState.filter).toBe(newFilter);
    });


});
