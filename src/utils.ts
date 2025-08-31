import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ECommands } from './constants';

export const readAndCleanTemplate = (templatePath: string): string => {
  const content = fs.readFileSync(templatePath, 'utf8');
  return content.replace(/(^\s*\/\/.*\r?\n?)+/gm, '').trimStart();
};

const createOpenTemplateCommand = (context: vscode.ExtensionContext, commandId: string, templateFile: string): vscode.Disposable => {
    return vscode.commands.registerCommand(commandId, () => {
      const templatePath = path.join(context.extensionPath, 'dist', 'templates', templateFile);
      vscode.workspace.openTextDocument(templatePath).then(doc => {
        vscode.window.showTextDocument(doc);
      }, (error: any) => {
        vscode.window.showErrorMessage(`Failed to open template file: ${templateFile}. ${error.message}`);
      });
    });
  };

export const registerTemplateOpenCommands = (context: vscode.ExtensionContext) => {
  const openComponentTemplateCmd = createOpenTemplateCommand(context, ECommands.OpenComponentTemplate, 'component.template');
  const openStyleTemplateCmd = createOpenTemplateCommand(context, ECommands.OpenStyleTemplate, 'style.template');
  const openIndexTemplateCmd = createOpenTemplateCommand(context, ECommands.OpenIndexTemplate, 'index.template');

  context.subscriptions.push(
    openComponentTemplateCmd,
    openStyleTemplateCmd,
    openIndexTemplateCmd
  );
};
