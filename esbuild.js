const esbuild = require('esbuild');
const cpy = require('cpy').default;

const production = process.argv.includes('production');
const watch = process.argv.includes('watch');

/** @type {import('esbuild').BuildOptions} */
const esbuildOptions = {
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  sourcemap: watch,
  minify: production,
};

async function build() {
  try {
    // Копируем шаблоны и иконку в папку dist
    await cpy('src/templates/**', 'dist/templates');
    await cpy('assets/icon.png', 'dist');
    console.log('Assets copied.');

    if (watch) {
      const context = await esbuild.context(esbuildOptions);
      await context.watch();
      console.log('Watching for changes...');
    } else {
      await esbuild.build(esbuildOptions);
      console.log('Build complete.');
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

build();