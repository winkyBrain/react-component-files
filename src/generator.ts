import * as path from 'path';
import { EFileExt, EFileNameCase, EStyleExt } from './constants';
import { formatName, toPascalCase } from './formatters';

export interface IComponentGenOptions {
  baseName: string;
  folderPath: string;
  fileExt: EFileExt;
  styleExt: EStyleExt;
  createIndexFile: boolean;
  createStyleFile: boolean;
  fileNameCase: EFileNameCase;
  componentTemplate: string;
  styleTemplate: string;
  indexTemplate: string;
}

export interface IGeneratedFile {
  path: string;
  content: string;
}

export const generateComponentFiles = (options: IComponentGenOptions): IGeneratedFile[] => {
  const {
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
  } = options;

  const componentName = toPascalCase(baseName);
  const fileName = formatName(baseName, fileNameCase);
  const className = formatName(baseName, EFileNameCase.Camel);

  const files: IGeneratedFile[] = [];

  // Component file
  let styleImportBlock = '';
  let classNameProp = '';

  if (createStyleFile) {
    styleImportBlock = `\nimport styles from './${fileName}.module.${styleExt}';\n`;
    classNameProp = ` className={styles.${className}}`;
  }

  const componentContent = componentTemplate
    .replace(/\$\{componentName\}/g, componentName)
    .replace(/\$\{styleImportBlock\}/g, styleImportBlock)
    .replace(/\$\{classNameProp\}/g, classNameProp);

  const componentPath = path.join(folderPath, `${fileName}.${fileExt}`);
  files.push({ path: componentPath, content: componentContent });

  // Style file
  if (createStyleFile) {
    const styleContent = styleTemplate.replace(/\$\{className\}/g, className);
    const stylePath = path.join(folderPath, `${fileName}.module.${styleExt}`);
    files.push({ path: stylePath, content: styleContent });
  }

  // Index file
  if (createIndexFile) {
    const indexContent = indexTemplate
      .replace(/\$\{componentName\}/g, componentName)
      .replace(/\$\{fileName\}/g, fileName);
    const indexPath = path.join(folderPath, `index.${fileExt.startsWith('ts') ? 'ts' : 'js'}`);
    files.push({ path: indexPath, content: indexContent });
  }

  return files;
}
