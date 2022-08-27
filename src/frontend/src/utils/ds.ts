import { provideFASTDesignSystem } from '@microsoft/fast-components';
import { DesignSystem } from '@microsoft/fast-foundation';

let designSystem: DesignSystem | undefined = undefined;

export function init() {
    if (designSystem === undefined) {
        designSystem = provideFASTDesignSystem();
    }
}

export function registerComponents(...params: any[]) {
    if (designSystem === undefined) {
        init();
    }

    designSystem!.register(...params);
}
