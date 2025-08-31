import * as fs from 'fs';
import * as path from 'path';
import { generateComponentFiles, IComponentGenOptions, IGeneratedFile } from './generator';
import { readAndCleanTemplate } from './utils';

describe('generateComponentFiles', () => {
  const componentTemplate = readAndCleanTemplate(path.resolve(__dirname, 'templates/component.template'));
  const styleTemplate = readAndCleanTemplate(path.resolve(__dirname, 'templates/style.template'));
  const indexTemplate = readAndCleanTemplate(path.resolve(__dirname, 'templates/index.template'));

  const defaultOptions: IComponentGenOptions = {
      baseName: 'MyTestComponent',
      folderPath: '/components/MyTestComponent',
      fileExt: 'tsx',
      styleExt: 'scss',
      createIndexFile: true,
      createStyleFile: true,
      fileNameCase: 'camelCase',
      componentTemplate,
      styleTemplate,
      indexTemplate,
    };

  describe('when generating camelCase with index and styles', () => {
    let generatedFiles: IGeneratedFile[];
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const options: IComponentGenOptions = {
        ...defaultOptions,
      };
      generatedFiles = generateComponentFiles(options);
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/camel/styled/component.tsx.snap'), 'utf8');
      expect(componentFile).toBeDefined();
      expect(path.basename(componentFile!.path)).toBe('myTestComponent.tsx');
      expect(componentFile!.content).toBe(expectedComponentContent);
    });

    it('should generate the style file correctly', () => {
      const expectedStylesContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/style.module.scss.snap'), 'utf8');
      expect(stylesFile).toBeDefined();
      expect(path.basename(stylesFile!.path)).toBe('myTestComponent.module.scss');
      expect(stylesFile!.content).toBe(expectedStylesContent);
    });

    it('should generate the index file correctly', () => {
      const expectedIndexContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/camel/index.ts.snap'), 'utf8');
      expect(indexFile).toBeDefined();
      expect(path.basename(indexFile!.path)).toBe('index.ts');
      expect(indexFile!.content).toBe(expectedIndexContent);
    });
  });
});
