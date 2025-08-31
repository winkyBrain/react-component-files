
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ECommands, EConfigKey } from './constants';
import { toPascalCase } from './formatters';
import { generateComponentFiles } from './generator';
import { readAndCleanTemplate, registerTemplateOpenCommands } from './utils';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(ECommands.GenerateFIles, async (uri: vscode.Uri) => {
    if (!uri || !uri.fsPath) {
      vscode.window.showErrorMessage('Please use the context menu on a folder.');
      return;
    }

    const folderPath = uri.fsPath;
    const baseName = path.basename(folderPath);

    const config = vscode.workspace.getConfiguration(EConfigKey.Root);
    const fileExt = config.get<string>('fileExtension', 'tsx');
    const styleExt = config.get<string>('styleExtension', 'scss');
    const createIndexFile = config.get<boolean>('createIndexFile', true);
    const createStyleFile = config.get<boolean>('createStyleFile', true);
    const fileNameCase = config.get<string>('fileNameCase', 'PascalCase');

    try {
      // Пути к файлам шаблонов в папке dist, куда их копирует esbuild
      const componentTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'component.template');
      const styleTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'style.template');
      const indexTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'index.template');

      const componentTemplate = readAndCleanTemplate(componentTemplatePath);
      const styleTemplate = readAndCleanTemplate(styleTemplatePath);
      const indexTemplate = readAndCleanTemplate(indexTemplatePath);

      const generatedFiles = generateComponentFiles({
        baseName,
        folderPath,
        fileExt,
        styleExt,
        createIndexFile,
        createStyleFile,
        fileNameCase,
        componentTemplate,
        styleTemplate,
        indexTemplate,
      });

      for (const file of generatedFiles) {
        if (!fs.existsSync(file.path)) {
          fs.writeFileSync(file.path, file.content);
        } else {
          vscode.window.showWarningMessage(`File already exists: ${file.path}`);
        }
      }

      const componentName = toPascalCase(baseName);
      vscode.window.showInformationMessage(`Component ${componentName} created successfully!`);

    } catch (error: any) {
      vscode.window.showErrorMessage(`Failed to create component: ${error.message}`);
    }
  });

  context.subscriptions.push(disposable);

  registerTemplateOpenCommands(context);
}

export function deactivate() {}
