import { groupBy } from "./objects";

describe("objects.ts", () => {

    test('Objects gets grouped by delegate', function () {

        const item1 = { A: 1, B: "Item 1" };
        const item2 = { A: 1, B: "Item 2" };
        const item3 = { A: 2, B: "Item 3" };
        const item4 = { A: 2, B: "Item 4" };

        const input = [item1, item2, item3, item4];

        const groupedItems = groupBy(input, item => item.A);

        expect(groupedItems[item1.A]).toBeDefined();
        expect(groupedItems[item1.A]).toContain(item1);
        expect(groupedItems[item1.A]).toContain(item2);

        expect(groupedItems[item3.A]).toBeDefined();
        expect(groupedItems[item3.A]).toContain(item3);
        expect(groupedItems[item3.A]).toContain(item4);
    });

    test('Not ordered objects gets grouped by delegate', function () {

        const item1 = { A: 1, B: "Item 1" };
        const item3 = { A: 1, B: "Item 2" };
        const item2 = { A: 2, B: "Item 3" };
        const item4 = { A: 2, B: "Item 4" };

        const input = [item1, item2, item3, item4];

        const groupedItems = groupBy(input, item => item.A);

        expect(groupedItems[item1.A]).toBeDefined();
        expect(groupedItems[item1.A]).toContain(item1);
        expect(groupedItems[item1.A]).toContain(item3);

        expect(groupedItems[item2.A]).toBeDefined();
        expect(groupedItems[item2.A]).toContain(item2);
        expect(groupedItems[item2.A]).toContain(item4);
    });
});
