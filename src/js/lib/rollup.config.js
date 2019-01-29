import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import inject from 'rollup-plugin-inject';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
const production = !process.env.ROLLUP_WATCH;

export default [
  {
	  input: './lib.js',
	  output: {
		  file: 'rtremote_node.js',
		  format: 'cjs',
      name: 'rtremote',
      esModule: false,
      footer: "module.exports = { RTRemoteMulticastResolver, RTRemoteUnicastResolver, RTRemoteConnectionManager, RTRemoteProxy, RTValueHelper, RTValueType, RTException, logger, helper };"
	  },
    plugins: [
      json(),
      replace({ 'process.browser': 'false' }),
      commonjs(),
      resolve({ 
        browser: false, 
        include: 'node_modules/**'
      })
    ],
    treeshake: false
  },
  {
	  input: './lib.js',
	  output: {
		  file: 'rtremote_browser.js',
		  format: 'iife',
      name: 'rtremote',
      banner: "class CBuffer{ from(data, enc) { return data; } }; var Buffer = new CBuffer; class crypto$1 {constructor(){}};"
	  },
    plugins: [
      json(),
      replace({ 'process.browser': 'true' }),
      commonjs(),
      resolve({ 
        browser: true, 
        include: 'node_modules/**'
      })
    ],
    treeshake: false
  }

]

