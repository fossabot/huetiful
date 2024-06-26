// eslint-disable-next-line no-undef
var { build } = require('esbuild');
var { devDependencies } = require('./package.json');

// For Node
build({
	legalComments: 'inline',
	entryPoints: [`./src/index.js`],
	format: 'esm',
	bundle: true,
	outfile: `./lib/huetiful.esm.node.js`,
	external: Object.keys(devDependencies),
	minify: false
});
console.log(`ESM build done.`);

// For browser

build({
	legalComments: 'inline',
	entryPoints: [`./src/index.js`],
	format: 'esm',
	bundle: true,
	outfile: `./lib/huetiful.esm.js`,
	minify: false
});

build({
	legalComments: 'inline',
	entryPoints: [`./src/index.js`],
	format: 'esm',
	bundle: true,
	outfile: `./lib/huetiful.esm.js`,
	minify: true,
	keepNames: true,
	minifyWhitespace: true,
	minifySyntax: true
});

// //Bundled IIFE
// build({
//   entryPoints: [`./src/index.js`],
//   bundle: true,
//   format: 'iife',
//   minify: false,
//   outfile: `./lib/huetiful.umd.js`,

//   keepNames: true
// });

// console.log(`UMD build done.`);

// //Bundled UMD minified
// build({
//   entryPoints: [`./src/index.js`],
//   bundle: true,
//   format: 'iife',
//   minify: true,
//   globalName: 'huetiful',
//   minifySyntax: true,
//   outfile: `./lib/huetiful.umd.min.js`
// });
// console.log(`[info] UMD build (bundled & minified) successful`);
