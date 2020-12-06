import { shallowMount } from '@vue/test-utils';
import NavToTestLink from './NavToTestLink.vue';



describe('NavToTestLink.vue', () => {

  test('Method name shown when method has not been found yet.', () => {
    const testId = "sometestid";
    const testMethodName = "some.test.method.name";
    const raiseTestMethodExists = jest.fn();
    window.addEventListener = jest.fn();

    const $Root = {
      data() {
        return { raiseTestMethodExists };
      }
    };

    const wrapper = shallowMount(NavToTestLink, {
      propsData: { testId, testMethodName }, parentComponent: $Root
    });

    expect(raiseTestMethodExists).toBeCalledTimes(1);
    expect(wrapper.find("span").text()).toBe(testMethodName);
    expect(wrapper.find("fast-tooltip").exists()).toBeTruthy();
    expect(wrapper.find("a").exists()).toBeFalsy();

    expect(window.addEventListener).toBeCalled();
  });

  test('Link to method shown when method has been found.', async () => {
    const testId = "sometestid";
    const testMethodName = "some.test.method.name";
    const raiseTestMethodExists = jest.fn();

    const $Root = {
      data() {
        return { raiseTestMethodExists };
      }
    };

    let addedCallback: ((message: any) => void) | null = null;
    let removedCallback: ((message: any) => void) | null = null;

    window.addEventListener = jest.fn((type, cb) => {
      addedCallback = cb as (message: any) => void;
    });
    window.removeEventListener = jest.fn((type, cb) => {
      removedCallback = cb as (message: any) => void;
    });

    const wrapper = shallowMount(NavToTestLink, {
      propsData: { testId, testMethodName }, parentComponent: $Root
    });

    expect(addedCallback).toBeDefined();

    addedCallback!({
      data: {
        type: "testMethodFound",
        testId
      }
    });

    await wrapper.vm.$nextTick();

    expect(raiseTestMethodExists).toBeCalledTimes(1);
    expect(wrapper.find("span").exists()).toBeFalsy();
    expect(wrapper.find("fast-tooltip").exists()).toBeFalsy();
    expect(wrapper.find("a").exists()).toBeTruthy();
    expect(addedCallback).toEqual(removedCallback);
  });

  test('Method name shown when method has not been found yet, but other method has been found.', async () => {
    const testId = "sometestid";
    const testId2 = "sometestid2";
    const testMethodName = "some.test.method.name";
    const raiseTestMethodExists = jest.fn();

    const $Root = {
      data() {
        return { raiseTestMethodExists };
      }
    };

    let callback: ((message: any) => void) | null = null;

    window.addEventListener = jest.fn((type, cb) => {
      callback = cb as (message: any) => void;
    });

    const wrapper = shallowMount(NavToTestLink, {
      propsData: { testId, testMethodName }, parentComponent: $Root
    });

    expect(callback).toBeDefined();

    callback!({
      data: {
        type: "testMethodFound",
        testId: testId2
      }
    });

    await wrapper.vm.$nextTick();

    expect(raiseTestMethodExists).toBeCalledTimes(1);
    expect(window.addEventListener).toBeCalled();

    expect(wrapper.find("span").text()).toBe(testMethodName);
    expect(wrapper.find("fast-tooltip").exists()).toBeTruthy();
    expect(wrapper.find("a").exists()).toBeFalsy();
  });
});