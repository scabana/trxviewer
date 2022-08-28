<template>
    <test-run v-if="$root.testRun" :testRun="$root.testRun" :testRunState="$root.testRunState"></test-run>
</template>
<script lang="ts">
import { accentPalette, neutralPalette, PaletteRGB, SwatchRGB, accentColor, fillColor } from "@microsoft/fast-components";
import { parseColorHexRGB, parseColor } from "@microsoft/fast-colors";
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import TestRun from "./components/TestRun.vue";
import { init } from "./utils/ds";

init();

@Component({
    components: {
        TestRun
    }
})
export default class App extends Vue {
    public name = "app";

    public mounted() {
        this.OnThemeChanged();
    }

    @Watch("$root.theme", { immediate: true })
    public OnThemeChanged() {
        if (this.$root.theme === null) {
            return;
        }

        const newAccentColor = this.$root.theme.accentColor;
        const backgroundColor = this.$root.theme.backgroundColor;
        let currentAccentColor = accentColor.getValueFor(document.body);
        let currentFillColor = fillColor.getValueFor(document.body);

        if (currentFillColor.toColorString() != backgroundColor) {
            neutralPalette.withDefault(PaletteRGB.from(SwatchRGB.from(parseColor(backgroundColor)!)));

            fillColor.withDefault(SwatchRGB.from(parseColorHexRGB(backgroundColor)!));
        }

        if (currentAccentColor.toColorString() != newAccentColor) {
            accentPalette.withDefault(PaletteRGB.from(SwatchRGB.from(parseColor(newAccentColor)!)));
        }
    }
}
</script>
