
# React Component Files

Quickly generate React component files (component, style, index) directly from the VS Code explorer context menu. This extension is designed to streamline your workflow by creating a consistent and customizable file structure for your React components.

## Features

-   **One-Click Generation**: Create a full component structure by right-clicking on a folder.
-   **Customizable File Naming**: Choose from `PascalCase`, `camelCase`, `kebab-case`, or `snake_case` for your generated files.
-   **Flexible File Extensions**: Supports both `.tsx` and `.jsx`.
-   **Optional Files**: Easily enable or disable the creation of `index` and style files.
-   **Multiple Style Options**: Supports `scss`, `css`, `less`, and `sass` for style files.
-   **Editable Templates**: Customize the content of generated files by editing the base templates directly within VS Code.

## Usage

1.  In the VS Code Explorer, right-click on the folder where you want to create the component.
2.  Select **"⚛️ Generate React Component"** from the context menu.
3.  The extension will automatically create the component files based on the folder name and your configured settings.

For example, right-clicking on a folder named `my-button` will generate:
-   `MyButton.tsx` (or `my-button.tsx`, etc., based on your settings)
-   `my-button.module.scss`
-   `index.ts`

## Configuration

You can customize the extension's behavior via the VS Code settings (`settings.json`).

| Setting | Description | Options | Default |
|---|---|---|---|
| `react-component-files.fileExtension` | File extension for generated components. | `tsx`, `jsx` | `tsx` |
| `react-component-files.fileNameCase` | Casing for the component file names. The component name inside the file will always be `PascalCase`. | `PascalCase`, `camelCase`, `kebab-case`, `snake_case` | `camelCase` |
| `react-component-files.createIndexFile` | Create an `index` file for re-exporting the component. | `true`, `false` | `true` |
| `react-component-files.createStyleFile` | Create a style file for the component. | `true`, `false` | `true` |
| `react-component-files.styleExtension` | File extension for generated style modules. | `scss`, `css`, `less`, `sass` | `scss` |

### How to Edit Templates

You can easily edit the templates used for file generation. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for:

-   `Component Generator: Edit Component Template`
-   `Component Generator: Edit Style Template`
-   `Component Generator: Edit Index Template`

Alternatively, you can find clickable links in the extension's settings UI.

The following placeholders are available in the templates:
-   `${componentName}`: The name of the component in `PascalCase` (e.g., `MyButton`).
-   `${fileName}`: The base name for the files, formatted according to the `fileNameCase` setting (e.g., `myButton` or `my-button`).
-   `${className}`: The CSS class name, always in `camelCase` (e.g., `myButton`).
-   `${styleExtension}`: The chosen extension for the style file (e.g., `scss`).

## Release Notes

See [CHANGELOG.md](CHANGELOG.md) for details on each release.
*(Suggestion: Create a CHANGELOG.md file to track changes)*

---

Happy Coding!
