export enum EConfigKey {
  Root = 'react-quick-component',
}
export enum ECommands {
  GenerateFIles = `${EConfigKey.Root}.generateFiles`,
  OpenComponentTemplate = `${EConfigKey.Root}.openComponentTemplate`,
  OpenStyleTemplate = `${EConfigKey.Root}.openStyleTemplate`,
  OpenIndexTemplate = `${EConfigKey.Root}.openIndexTemplate`,
}

export enum EFileExt {
  Tsx = 'tsx',
  Jsx = 'jsx',
}

export enum EFileNameCase {
  Pascal = 'PascalCase',
  Camel = 'camelCase',
  Kebab = 'kebab-case',
  Snake = 'snake_case',
}

export enum EStyleExt {
  Scss = 'scss',
  Css = 'css',
  Less = 'less',
  Sass = 'sass',
}
