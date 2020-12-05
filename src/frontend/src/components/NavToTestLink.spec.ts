import { createLocalVue, shallowMount } from '@vue/test-utils';
import NavToTestLink from './NavToTestLink.vue';



describe('NavToTestLink.vue', () => {
  test('filteredItems contains list of filtered item using filter', () => {
    const testId = "sometestid";
    const testMethodName = "some.test.method.name";

    const $Root = {
      data() {
        return {
          raiseTestMethodExists: jest.fn()
        };
      }
    };

    const wrapper = shallowMount(NavToTestLink, {
      propsData: { testId, testMethodName }, parentComponent: $Root
    });

    expect(wrapper.find("span").text()).toBe(testMethodName);
  });
});