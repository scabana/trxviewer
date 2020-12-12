import { getOutcomeStyle, normalizeColor } from "./styles";

describe("styles.ts", () => {

    test('getOutcomeStyle - Passed returns a style object that results to green', function () {

        const styles = getOutcomeStyle("Passed");

        expect(styles).toBeDefined();
        expect(styles?.color).toEqual("var(--green, green)");
    });

    test('getOutcomeStyle - Failed returns a style object that results to red', function () {

        const styles = getOutcomeStyle("Failed");

        expect(styles).toBeDefined();
        expect(styles?.color).toEqual("var(--red, red)");
    });

    test('getOutcomeStyle - Unknown returns no style', function () {

        const styles = getOutcomeStyle("Unknown");

        expect(styles).toBeUndefined();
    });

    test('normalizeColor - rgba removes opacity', function () {

        const color = normalizeColor("rgba(1,1,1,1)");

        expect(color).toBe("rgb(1,1,1)");
    });

    test('normalizeColor - non rgba returns original', function () {

        const input = "someotherstuff";
        const color = normalizeColor(input);

        expect(color).toBe(input);
    });

    test('normalizeColor - HEX returns original', function () {

        const input = "#FFAAFF";
        const color = normalizeColor(input);

        expect(color).toBe(input);
    });

});
