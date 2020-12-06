import { createApp, getApp, getTestModel, updateTestRun, updateTestRunState } from './AppContext';
import { normalizeColor } from "./utils/styles";
import { vscode } from "./utils/vscode";

createApp({
    canShowTest: () => true,
    raiseTestMethodExists: testId => {
        const test = getTestModel(testId);
        vscode.postMessage({ type: "testMethodExists", testId: testId, symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
    },
    showFilePicker: () => false,
    navToTestMethod: testId => {
        const test = getTestModel(testId);
        vscode.postMessage({ type: "navToTest", symbolName: `${test.testMethodClassName}.${test.testMethodName}` });
    },
});

const state = vscode.getState();
if (state) {
    updateTestRunState(state.state);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
let watcherCancel: () => void = function () { };

async function registerToStateChanges() {
    const app = getApp();
    await app.$nextTick();

    watcherCancel = app.$watch("testRunState", function (newValue, oldValue) {

        if (newValue !== undefined && newValue !== null) {
            vscode.setState({ state: JSON.parse(JSON.stringify(newValue)) });
            vscode.postMessage({ type: "stateUpdated" });
        }
    }, { deep: true });
}

window.document.addEventListener("readystatechange", () => {
    const observer = new MutationObserver(() => {

        const backgroundColor = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-editorPane-background"));
        const accentColor = normalizeColor(document.documentElement.style.getPropertyValue("--vscode-focusBorder"));

        const app = getApp();
        app.theme = {
            accentColor: accentColor,
            backgroundColor: backgroundColor
        };
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
});

window.addEventListener('message', event => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
        case 'update':
            {
                const content = message.content;
                watcherCancel();
                updateTestRun(content);
                registerToStateChanges();
            }
    }
});

registerToStateChanges();

vscode.postMessage({ type: "readyForData" });
