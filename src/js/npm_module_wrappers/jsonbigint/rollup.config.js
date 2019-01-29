import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
const production = !process.env.ROLLUP_WATCH;

export default [
  {
	  input: 'index.js',
	  output: {
		  file: 'jsonbigintwrapper.js',
		  format: 'cjs', 
      name: 'jsonbigintwrapper'
	  },
	  plugins: [
      json(),
      commonjs(),
      resolve({ 
        browser: false, 
        include: 'node_modules/**'
      })
	  ],
    treeshake: false
  }
];

