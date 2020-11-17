import * as path from 'path';
import { TextDecoder } from 'util';
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

		const updateWebview = () => {
			webviewPanel.webview.postMessage({
				type: 'update',
				content: document.getText(),
			});
		};

		webviewPanel.webview.onDidReceiveMessage((e: any) => {
			switch (e.type) {
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
			}
		});

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
			path.join(this.context.extensionPath, 'media')
		));

		// Use a nonce to whitelist which scripts can be run

		const encoder = new TextDecoder("utf-8");

		const index = await vscode.workspace.fs.readFile(vscode.Uri.file(
			path.join(this.context.extensionPath, 'media', 'vs-code.html')
		));
		let indexText = encoder.decode(index);

		const nonce = getNonce();

		indexText = indexText.replace("<meta charset=\"utf-8\" />", `<meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none';img-src ${webview.cspSource}; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';" />`);
		indexText = indexText.replace(/<script/gi, `<script nonce="${nonce}"`);
		indexText = indexText.replace(/<link/gi, `<link nonce="${nonce}"`);

		indexText = indexText.replace("<base href=\"/\" />", `<base href="${base}/" />`);

		return indexText;
	}
}
