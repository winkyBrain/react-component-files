export const toPascalCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/[-_\s]/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};

const fromPascalToCamelCase = (pascal: string): string => pascal.charAt(0).toLowerCase() + pascal.slice(1);

const fromPascalWithSeparator = (pascal: string, separator: string): string => {
  return pascal.replace(/([A-Z])/g, (match, p1, offset) => (offset > 0 ? separator : '') + p1.toLowerCase());
};

export const formatName = (name: string, caseType: string): string => {
  const pascalName = toPascalCase(name);

  switch (caseType) {
    case 'camelCase':
      return fromPascalToCamelCase(pascalName);
    case 'kebab-case':
      return fromPascalWithSeparator(pascalName, '-');
    case 'snake_case':
      return fromPascalWithSeparator(pascalName, '_');
    case 'PascalCase':
    default:
      return pascalName;
  }
};
