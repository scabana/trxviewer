import { shallowMount } from '@vue/test-utils';
import UnitTestResult from './UnitTestResult.vue';
import { getTestModel, getTestResultOutputModel } from "../AppContext";
import AttrAsContent from '../utils/tests/AttrAsContent';

jest.mock("../AppContext", () => {
    return {
        getTestModel: jest.fn(),
        getTestResultOutputModel: jest.fn()
    };
});

describe('UnitTestResult.vue', () => {

    test('Displays test without errorInfo.', () => {

        const testResult = {
            testMethodName: "some test method name",
            testMethodClassName: "some test class name"
        };
        const testId = "sometestid";
        const testName = "some test name";

        (getTestModel as jest.Mock<any, any>).mockImplementation(function (id) {
            expect(id).toBe(testId);

            return testResult;
        });
        (getTestResultOutputModel as jest.Mock<any, any>).mockImplementation(function (id) {
            expect(id).toBe(testId);

            return {
                errorInfo: {
                    message: "",
                    stackTrace: ""
                }
            };
        });

        const wrapper = shallowMount(UnitTestResult, {
            propsData: {
                itemState: {
                    expanded: {
                        isExpanded: true
                    }
                },
                item: {
                    testId,
                    testName
                }
            },
            stubs: {
                "nav-to-test-link": AttrAsContent("testMethodName")
            }
        });

        expect(wrapper.find("[slot=heading]").text()).toBe(testName);
        expect(wrapper.find("[name=classname]").text()).toBe(`Class name: ${testResult.testMethodClassName}`);
        expect(wrapper.find("[name=errorinfomessage]").exists()).toBeFalsy();
        expect(wrapper.find("[name=errorinfostacktrace]").exists()).toBeFalsy();
    });

    test('Displays test with errorInfo.', () => {

        const testResult = {
            testMethodName: "some test method name",
            testMethodClassName: "some test class name"
        };
        const testResultOuputModel = {
            errorInfo: {
                message: "some message",
                stackTrace: "some stack trace"
            }
        };
        const testId = "sometestid";
        const testName = "some test name";

        (getTestModel as jest.Mock<any, any>).mockImplementation(function (id) {
            expect(id).toBe(testId);

            return testResult;
        });
        (getTestResultOutputModel as jest.Mock<any, any>).mockImplementation(function (id) {
            expect(id).toBe(testId);

            return testResultOuputModel;
        });

        const wrapper = shallowMount(UnitTestResult, {
            propsData: {
                itemState: {
                    expanded: {
                        isExpanded: true
                    }
                },
                item: {
                    testId,
                    testName
                }
            },
            stubs: {
                "nav-to-test-link": AttrAsContent("testMethodName")
            }
        });

        expect(wrapper.find("[slot=heading]").text()).toBe(testName);
        expect(wrapper.find("[name=classname]").text()).toBe(`Class name: ${testResult.testMethodClassName}`);
        expect(wrapper.find("[name=errorinfomessage]").text()).toBe(`Message: ${testResultOuputModel.errorInfo.message}`);
        expect(wrapper.find("[name=errorinfostacktrace]").text()).toBe(`Stack Trace: ${testResultOuputModel.errorInfo.stackTrace}`);
    });

    test('Context.IsExpanded false, result is collapted on load.', () => {

        const testResult = {
            testMethodName: "",
            testMethodClassName: ""
        };
        const testId = "sometestid";
        const testName = "some test name";

        const wrapper = shallowMount(UnitTestResult, {
            propsData: {
                itemState: {
                    expanded: {
                        isExpanded: false
                    }
                },
                item: {
                    testId,
                    testName
                }
            }
        });

        expect(wrapper.find("[slot=heading]").text()).toBe(testName);
        expect(wrapper.find("fast-accordion-item").attributes("expanded")).toBeUndefined();
        expect(wrapper.find("[name=classname]").exists()).toBeFalsy();
    });
});
