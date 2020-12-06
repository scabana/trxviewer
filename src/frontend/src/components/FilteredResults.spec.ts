import { shallowMount } from '@vue/test-utils';
import FilteredResults from './FilteredResults.vue';
import Vue from 'vue';

interface TestItem {
  prop1: string;
}

describe('FilteredResults.vue', () => {
  test('filteredItems contains list of filtered item using filter', () => {
    const items = [{
      prop1: "1"
    },
    {
      prop1: "2"
    }];
    const filter = (item: TestItem) => item.prop1 == "1";

    const wrapper = shallowMount(FilteredResults, { propsData: { items, filter } });

    expect((wrapper.vm as any).filteredItems).toEqual([items[0]]);
  });
});