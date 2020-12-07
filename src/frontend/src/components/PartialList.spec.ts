import { shallowMount, Wrapper } from '@vue/test-utils';
import PartialList from './PartialList.vue';

describe('PartialList.vue', () => {

    test('Not enough items, no more button shown', () => {
        const items = Array.from(Array(49).keys())

        const wrapper = shallowMount(PartialList, {
            propsData: { items }
        });

        expect(wrapper.find("fast-button").exists()).toBe(false);
    });

    test('Enough items, more button shown.', () => {
        const items = Array.from(Array(51).keys())

        const wrapper = shallowMount(PartialList, {
            propsData: { items }
        });

        expect(wrapper.find("fast-button").exists()).toBe(true);
    });

    test('Multiple pages, should load more', async () => {
        const items = Array.from(Array(201).keys())

        const wrapper = shallowMount(PartialList, {
            propsData: { items }
        });

        const checkAndClick = async (wrapper: Wrapper<any>, count: number) => {
            expect(wrapper.find("fast-button").exists()).toBe(true);
            expect((wrapper.vm as any).filteredItems.length).toBe(count);
            wrapper.find("fast-button").element.click();
            await wrapper.vm.$nextTick;
        }

        await checkAndClick(wrapper, 50);
        await checkAndClick(wrapper, 100);
        await checkAndClick(wrapper, 150);
        await checkAndClick(wrapper, 200);

        expect(wrapper.find("fast-button").exists()).toBe(false);
        expect((wrapper.vm as any).filteredItems.length).toBe(201);
    });

});
