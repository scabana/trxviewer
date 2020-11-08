import * as path from 'path';
import * as vscode from 'vscode';
import { WorkspaceSymbolProvider } from 'vscode';
import { getNonce } from './util';

/**
 * Provider for cat scratch editors.
 * 
 * Cat scratch editors are used for `.cscratch` files, which are just json files.
 * To get started, run this extension and open an empty `.cscratch` file in VS Code.
 * 
 * This provider demonstrates:
 * 
 * - Setting up the initial webview for a custom editor.
 * - Loading scripts and styles in a custom editor.
 * - Synchronizing changes between a text document and a custom editor.
 */
export class TrxEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new TrxEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(TrxEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'trxviewer';

	constructor(
		private readonly context: vscode.ExtensionContext
	) { }

	/**
	 * Called when our custom editor is opened.
	 * 
	 * 
	 */
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

		const updateWebview = () => {
			webviewPanel.webview.postMessage({
				type: 'update',
				content: document.getText(),
			});
		};

		webviewPanel.webview.onDidReceiveMessage(e => {
			switch (e.type) {
				case 'navToTest':
					vscode.commands.executeCommand("vscode.executeWorkspaceSymbolProvider", e.symbolName).then(
						s => {
							const symbols: vscode.SymbolInformation[] = s as vscode.SymbolInformation[];

							let symbol = symbols.filter(i => i.kind == vscode.SymbolKind.Method)[0];
							//symbol.
							vscode.workspace.openTextDocument(symbol.location.uri).then(editor => {
								var { start, end } = symbol.location.range;
								const selection = new vscode.Selection(start.line, start.character, start.line, end.character);
								vscode.window.showTextDocument(editor).then(() => {
									const editor = vscode.window.activeTextEditor;
									if (editor) {
										editor.selection = selection;
										editor.revealRange(selection, vscode.TextEditorRevealType.InCenter);
									}
								});
							})
						}
					);
					return;
			}
		});

		// const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
		// 	if (e.document.uri.toString() === document.uri.toString()) {
		// 		updateWebview();
		// 	}
		// });

		// Make sure we get rid of the listener when our editor is closed.
		// webviewPanel.onDidDispose(() => {
		// 	changeDocumentSubscription.dispose();
		// });

		updateWebview();
	}

	/**
	 * Get the static html used for the editor webviews.
	 */
	private async getHtmlForWebview(webview: vscode.Webview): Promise<string> {
		// // Local path to script and css for the webview
		// const scriptUri = webview.asWebviewUri(vscode.Uri.file(
		// 	path.join(this.context.extensionPath, 'media', 'catScratch.js')
		// ));
		const base = webview.asWebviewUri(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media/wwwroot')
		));

		// Use a nonce to whitelist which scripts can be run

		const index = await vscode.workspace.fs.readFile(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media/wwwroot', 'vs-code.html')
		));

		let indexText = String.fromCharCode.apply(null, index as any as number[]);

		// Can't use csp for the moment because we use wasm and eval is not allowed. Because the wasm file comes with a application/UNKNOWN content-type.
		// const nonce = getNonce();
		// indexText = indexText.replace("<meta charset=\"utf-8\" />", `<meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none';connect-src ${webview.cspSource};img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}' 'sha256-v8v3RKRPmN4odZ1CWM5gw80QKPCCWMcpNeOmimNL2AA=' 'sha256-0U0xZwqssxtrm2zqzr1ElYK99IcQMyne3zhgTEhtLos=';" />`);
		// indexText = indexText.replace(/<script/gi, `<script nonce="${nonce}"`);

		indexText = indexText.replace("<base href=\"/\" />", `<base href="${base}/" />`);

		return indexText;
	}
}
