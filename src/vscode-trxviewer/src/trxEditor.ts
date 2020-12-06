import * as path from 'path';
import * as vscode from 'vscode';
import { getNonce } from './util';

export class TrxEditorProvider implements vscode.CustomTextEditorProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new TrxEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(TrxEditorProvider.viewType, provider);

        return providerRegistration;
    }

    private static readonly viewType = 'trxviewer';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
    }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {

        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        webviewPanel.webview.html = await this.getHtmlForWebview(webviewPanel.webview);

        webviewPanel.webview.onDidReceiveMessage((e: any) => {
            switch (e.type) {
                case 'readyForData':
                    webviewPanel.webview.postMessage({
                        type: 'update',
                        content: document.getText(),
                    });
                    return;
                case 'navToTest':
                    vscode.commands.executeCommand("vscode.executeWorkspaceSymbolProvider", e.symbolName).then(
                        s => {
                            const symbols: vscode.SymbolInformation[] = s as vscode.SymbolInformation[];
                            const symbol = symbols.filter(i => i.kind == vscode.SymbolKind.Method)[0];
                            const { start, end } = symbol.location.range;
                            const selection = new vscode.Selection(start.line, start.character, start.line, end.character);

                            vscode.window.showTextDocument(symbol.location.uri, { selection });
                        }
                    );
                    return;
                case 'testMethodExists':
                    this.raiseFindTestMethod(e.testId, e.symbolName, webviewPanel.webview, 0);
                    return;
                case 'stateUpdated':
                    vscode.commands.executeCommand("workbench.action.keepEditor");
            }
        });
    }

    /*
        This retry logic is to account for a freshly loaded vscode instance where 
        omnisharp hasn't loaded the symbols yet.
    */
    private raiseFindTestMethod(testId: string, symbolName: string, webView: vscode.Webview, tryIndex: number) {
        vscode.commands.executeCommand("vscode.executeWorkspaceSymbolProvider", symbolName).then(
            s => {
                const symbols: vscode.SymbolInformation[] = s as vscode.SymbolInformation[];
                const filteredSymbols = symbols.filter(i => i.kind == vscode.SymbolKind.Method);

                if (filteredSymbols.length > 0) {
                    webView.postMessage({
                        type: 'testMethodFound',
                        testId: testId,
                    });
                }
                else {

                    if (tryIndex === 25) {
                        //At some point, we won't find it, no real reason to keep looking.
                        return;
                    }

                    const nextTryIndex = tryIndex + 1;

                    setTimeout(() => { this.raiseFindTestMethod(testId, symbolName, webView, nextTryIndex); }, nextTryIndex * 100);
                }
            }
        );
    }

    /**
     * Get the static html used for the editor webviews.
     */
    private async getHtmlForWebview(webview: vscode.Webview): Promise<string> {
        const nonce = getNonce();
        const base = webview.asWebviewUri(vscode.Uri.file(path.join(this.context.extensionPath, 'media')));
        const index = await vscode.workspace.fs.readFile(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'vs-code.html')));
        let indexText = Buffer.from(index).toString("utf8");

        indexText = indexText.replace("<meta charset=\"utf-8\" />", `<meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none';img-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';" />`);
        indexText = indexText.replace(/<script/gi, `<script nonce="${nonce}"`);
        indexText = indexText.replace(/<link/gi, `<link nonce="${nonce}"`);
        indexText = indexText.replace("<base href=\"/\" />", `<base href="${base}/" />`);

        if (vscode.workspace.getConfiguration().get("trxviewer.enableSourceMaps") === true) {
            try {
                await vscode.workspace.fs.stat(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'scripts', 'app.debug.js')));
            }
            catch {
                const appjs = await vscode.workspace.fs.readFile(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'scripts', 'app.js')));
                const jsString = Buffer.from(appjs).toString("utf8");
                const appjsmap = await vscode.workspace.fs.readFile(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'scripts', 'app.js.map')));
                const mapBase64 = Buffer.from(appjsmap).toString("base64");

                await vscode.workspace.fs.writeFile(vscode.Uri.file(path.join(this.context.extensionPath, 'media', 'scripts', 'app.debug.js')), Buffer.from(jsString + "\r\n" + "//# sourceMappingURL=data:application/json;charset=utf-8;base64," + mapBase64));
            }

            indexText = indexText.replace("app.js", "app.debug.js");
        }

        return indexText;
    }
}
