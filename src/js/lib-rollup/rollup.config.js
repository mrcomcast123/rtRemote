import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
const production = !process.env.ROLLUP_WATCH;

export default [
  {
    /*
    external: [
      'json-bigint'
    ],*/
	  input: 'main.js',
	  output: {
		  file: 'bundle_node.js',
		  format: 'cjs', 
      name: 'rtremote'
	  },
	  plugins: [
      json(),
      replace({ 'process.browser': 'false' }),
      commonjs(),
      resolve({ 
        browser: false,
        include: 'node_modules/**'
      })
	  ]
  },
  {
    /*external: [
      'json-bigint'
    ],
    global: [
      'json-bigint', 'JSONbig'
    ],*/
	  input: 'main.js',
	  output: {
		  file: 'bundle_browser.js',
		  format: 'iife', 
      name: 'rtremote'
	  },
	  plugins: [
      json(),
      replace({ 'process.browser': 'true' }),
      commonjs(),
      resolve({ 
        browser: true, 
        include: 'node_modules/**'
      })
	  ]
  },
  {
	  input: 'library.js',
	  output: {
		  file: 'bundle_library_node.js',
		  format: 'cjs', 
      name: 'rtremote'
	  },
	  plugins: [
      json(),
      replace({ 'process.browser': 'false' }),

      resolve({ 
        browser: false, 
        include: 'node_modules/**'
      })
	  ],
    treeshake: false
  }
];

