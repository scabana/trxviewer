declare global {
    interface Window {
        acquireVsCodeApi: () => VsCodeWebView;
    }

    interface VsCodeWebView {
        getState: () => any,
        setState: (state: any) => void,
        postMessage: (message: any) => void
    }

}

export const vscode = window.acquireVsCodeApi();
