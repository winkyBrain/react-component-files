import * as fs from 'fs';
import * as path from 'path';
import { EFileExt, EFileNameCase, EStyleExt } from '../src/constants';
import { generateComponentFiles, IComponentGenOptions, IGeneratedFile } from '../src/generator';
import { readAndCleanTemplate } from '../src/utils';
describe('generateComponentFiles', () => {
  const componentTemplate = readAndCleanTemplate(path.resolve(__dirname, '../src/templates/component.template'));
  const styleTemplate = readAndCleanTemplate(path.resolve(__dirname, '../src/templates/style.template'));
  const indexTemplate = readAndCleanTemplate(path.resolve(__dirname, '../src/templates/index.template'));

  const defaultOptions: IComponentGenOptions = {
      baseName: 'MyTestComponent',
      folderPath: '/components/MyTestComponent',
      fileExt: EFileExt.Tsx,
      styleExt: EStyleExt.Scss,
      createIndexFile: true,
      createStyleFile: true,
      fileNameCase: EFileNameCase.Camel,
      componentTemplate,
      styleTemplate,
      indexTemplate,
    };

  describe('when generating camelCase with index and scss styles', () => {
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const generatedFiles: IGeneratedFile[] = generateComponentFiles(defaultOptions);
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/camel/component.tsx.snap'), 'utf8');
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
      const expectedIndexContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/camel/index.ts.snap'), 'utf8');
      expect(indexFile).toBeDefined();
      expect(path.basename(indexFile!.path)).toBe('index.ts');
      expect(indexFile!.content).toBe(expectedIndexContent);
    });
  });

  describe('when generating PascalCase with index and less styles', () => {
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const options = {...defaultOptions, fileNameCase: EFileNameCase.Pascal, styleExt: EStyleExt.Less};
      const generatedFiles: IGeneratedFile[] = generateComponentFiles(options)
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/pascal/component.tsx.snap'), 'utf8');
      expect(componentFile).toBeDefined();
      expect(path.basename(componentFile!.path)).toBe('MyTestComponent.tsx');
      expect(componentFile!.content).toBe(expectedComponentContent);
    });

    it('should generate the style file correctly', () => {
      const expectedStylesContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/style.module.scss.snap'), 'utf8');
      expect(stylesFile).toBeDefined();
      expect(path.basename(stylesFile!.path)).toBe('MyTestComponent.module.less');
      expect(stylesFile!.content).toBe(expectedStylesContent);
    });

    it('should generate the index file correctly', () => {
      const expectedIndexContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/pascal/index.ts.snap'), 'utf8');
      expect(indexFile).toBeDefined();
      expect(path.basename(indexFile!.path)).toBe('index.ts');
      expect(indexFile!.content).toBe(expectedIndexContent);
    });
  });

  describe('when generating kebab-case with index and sass styles', () => {
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const options = {...defaultOptions, fileNameCase: EFileNameCase.Kebab, styleExt: EStyleExt.Less};
      const generatedFiles: IGeneratedFile[] = generateComponentFiles(options)
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/kebab/component.tsx.snap'), 'utf8');
      expect(componentFile).toBeDefined();
      expect(path.basename(componentFile!.path)).toBe('my-test-component.tsx');
      expect(componentFile!.content).toBe(expectedComponentContent);
    });

    it('should generate the style file correctly', () => {
      const expectedStylesContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/style.module.scss.snap'), 'utf8');
      expect(stylesFile).toBeDefined();
      expect(path.basename(stylesFile!.path)).toBe('my-test-component.module.less');
      expect(stylesFile!.content).toBe(expectedStylesContent);
    });

    it('should generate the index file correctly', () => {
      const expectedIndexContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/kebab/index.ts.snap'), 'utf8');
      expect(indexFile).toBeDefined();
      expect(path.basename(indexFile!.path)).toBe('index.ts');
      expect(indexFile!.content).toBe(expectedIndexContent);
    });
  });

  describe('when generating snake_case with index and css styles', () => {
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const options = {...defaultOptions, fileNameCase: EFileNameCase.Snake, styleExt: EStyleExt.Css};
      const generatedFiles: IGeneratedFile[] = generateComponentFiles(options)
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/snake/component.tsx.snap'), 'utf8');
      expect(componentFile).toBeDefined();
      expect(path.basename(componentFile!.path)).toBe('my_test_component.tsx');
      expect(componentFile!.content).toBe(expectedComponentContent);
    });

    it('should generate the style file correctly', () => {
      const expectedStylesContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/style.module.scss.snap'), 'utf8');
      expect(stylesFile).toBeDefined();
      expect(path.basename(stylesFile!.path)).toBe('my_test_component.module.css');
      expect(stylesFile!.content).toBe(expectedStylesContent);
    });

    it('should generate the index file correctly', () => {
      const expectedIndexContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/styled/snake/index.ts.snap'), 'utf8');
      expect(indexFile).toBeDefined();
      expect(path.basename(indexFile!.path)).toBe('index.ts');
      expect(indexFile!.content).toBe(expectedIndexContent);
    });
  });

  describe('when generating camelCase without index and styles', () => {
    let componentFile: IGeneratedFile | undefined;
    let stylesFile: IGeneratedFile | undefined;
    let indexFile: IGeneratedFile | undefined;

    beforeAll(() => {
      const options = {...defaultOptions, fileNameCase: EFileNameCase.Camel, createIndexFile: false, createStyleFile: false};
      const generatedFiles: IGeneratedFile[] = generateComponentFiles(options)
      componentFile = generatedFiles[0];
      stylesFile = generatedFiles[1];
      indexFile = generatedFiles[2];
    });

    it('should generate the component file correctly', () => {
      const expectedComponentContent = fs.readFileSync(path.resolve(__dirname, '__snapshots__/unstyled/component.tsx.snap'), 'utf8');
      expect(componentFile).toBeDefined();
      expect(path.basename(componentFile!.path)).toBe('myTestComponent.tsx');
      expect(componentFile!.content).toBe(expectedComponentContent);
    });

    it('should not generate the style file correctly', () => {
      expect(stylesFile).toBeUndefined();
    });

    it('should not generate the index file correctly', () => {
      expect(indexFile).toBeUndefined();
    });
  });
});
