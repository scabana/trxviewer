import Vue from 'vue';
import App from './App.vue';
import Callbacks from './models/Callbacks';
import TestRunState from './models/state/TestRunState';
import Theme from './models/Theme';
import TestRun from './models/trx/TestRun';
import * as trx from './utils/trx';

declare global {
    interface Window {
        app: Vue;
        summaryExpandedByDefault: boolean;
    }
}

declare module 'vue/types/vue' {
    interface Vue extends Callbacks {
        testRun: TestRun,
        testRunState: TestRunState,
        theme: Theme
    }
}


let app: Vue | null = null;
let callbacks: Callbacks | null = null;
let testRunDocument: Document | null = null;
const state: TestRunState = {
    resultGroups: {

    },
    filter: "",
    summary: {
        expanded: {
            isExpanded: window.summaryExpandedByDefault
        }
    }
};

export function createApp(cb: Callbacks) {
    callbacks = cb;

    window.app = app = new Vue({
        el: "#app",
        render: r => r(App),
        data: {
            testRun: null,
            testRunState: state,
            theme: null
        },
        methods: cb
    });
}

export function getTestModel(testId: string) {
    return trx.getTestModel(testRunDocument, testId);
}

export function getTestResultOutputModel(testId: string) {
    return trx.getTestResultOutputModel(testRunDocument, testId);
}

export function updateTestRun(content: string) {
    testRunDocument = trx.parseStringXml(content);
    app!.testRun = trx.getTestRun(testRunDocument);
}

export function updateTestRunState(state: TestRunState) {
    app!.testRunState = state;
}

export function getApp() {
    return app!;
}
