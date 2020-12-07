import { mount } from '@vue/test-utils';
import AttrAsContent from '../utils/tests/AttrAsContent';
import UnitTestResultGroup from './UnitTestResultGroup.vue';

describe('UnitTestResultGroup.vue', () => {

    //TODO: add more tests, this is pretty light.

    test('A unit-test-result is in the output', () => {

        const testResult = {
            testMethodName: "some test method name",
            testMethodClassName: "some test class name"
        };
        const testId = "sometestid";
        const testName = "some test name";
        const result = "Passed";

        //Mount was much much easier here since this component is using 2 templates to filter and group data.
        //Mocking all of those would have been pretty hard.
        const wrapper = mount(UnitTestResultGroup, {
            propsData: {
                groupState: {
                    expanded: {
                        isExpanded: true
                    },
                    itemStates: {
                        sometestid: {
                            expanded: {
                                isExpanded: true
                            }
                        }
                    }
                },
                items: [
                    {
                        testId,
                        testName
                    }
                ],
                filter: "",
                result
            },
            stubs: {
                "unit-test-result": AttrAsContent(attrs => attrs.item.testName, { attrs: { name: "testitem" } })
            }
        });

        expect(wrapper.find("[slot=heading]").text()).toBe(result);
        expect(wrapper.find("[name=testitem]").text()).toBe(testName);
    });


});
