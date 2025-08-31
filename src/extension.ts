
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { ECommands, EConfigKey } from './constants';
import { formatName, toPascalCase } from './formatters';
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

    const componentName = toPascalCase(baseName);
    const fileName = formatName(baseName, fileNameCase);
    const className = formatName(baseName, 'camelCase'); // Всегда camelCase для стилей

    try {
      // Пути к файлам шаблонов в папке dist, куда их копирует esbuild
      const componentTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'component.template');
      const componentTemplate = readAndCleanTemplate(componentTemplatePath);
      const componentContent = componentTemplate
        .replace(/\$\{componentName\}/g, componentName)
        .replace(/\$\{fileName\}/g, fileName)
        .replace(/\$\{styleExtension\}/g, styleExt)
        .replace(/\$\{className\}/g, className); // Используем новую переменную для класса

      const componentPath = path.join(folderPath, `${fileName}.${fileExt}`);
      if (!fs.existsSync(componentPath)) {
        fs.writeFileSync(componentPath, componentContent);
      } else {
        vscode.window.showWarningMessage(`File already exists: ${componentPath}`);
      }

      if (createStyleFile) {
        const styleTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'style.template');
        const styleTemplate = readAndCleanTemplate(styleTemplatePath);
        const styleContent = styleTemplate
          .replace(/\$\{className\}/g, className); // Используем ту же переменную
        const stylePath = path.join(folderPath, `${fileName}.module.${styleExt}`);

        if (!fs.existsSync(stylePath)) {
          fs.writeFileSync(stylePath, styleContent);
        } else {
          vscode.window.showWarningMessage(`File already exists: ${stylePath}`);
        }
      }

      if (createIndexFile) {
        const indexTemplatePath = path.join(context.extensionPath, 'dist', 'templates', 'index.template');
        const indexTemplate = readAndCleanTemplate(indexTemplatePath);
        const indexContent = indexTemplate
          .replace(/\$\{componentName\}/g, componentName)
          .replace(/\$\{fileName\}/g, fileName);
        const indexPath = path.join(folderPath, `index.${fileExt.startsWith('ts') ? 'ts' : 'js'}`);

        if (!fs.existsSync(indexPath)) {
          fs.writeFileSync(indexPath, indexContent);
        } else {
          vscode.window.showWarningMessage(`File already exists: ${indexPath}`);
        }
      }

      vscode.window.showInformationMessage(`Component ${componentName} created successfully!`);

    } catch (error: any) {
      vscode.window.showErrorMessage(`Failed to create component: ${error.message}`);
    }
  });

  context.subscriptions.push(disposable);

  registerTemplateOpenCommands(context);
}

export function deactivate() {}
