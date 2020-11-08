import * as vscode from 'vscode';
import { TrxEditorProvider } from './trxEditor';

export function activate(context: vscode.ExtensionContext) {
	// Register our custom editor providers
	context.subscriptions.push(TrxEditorProvider.register(context));
}
