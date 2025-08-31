export enum EConfigKey {
  Root = 'react-component-files',
}
export enum ECommands {
  GenerateFIles = `${EConfigKey.Root}.generateFiles`,
  OpenComponentTemplate = `${EConfigKey.Root}.openComponentTemplate`,
  OpenStyleTemplate = `${EConfigKey.Root}.openStyleTemplate`,
  OpenIndexTemplate = `${EConfigKey.Root}.openIndexTemplate`,
}
