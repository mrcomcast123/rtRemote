'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var util = _interopDefault(require('util'));
var os = _interopDefault(require('os'));
var stream = _interopDefault(require('stream'));
var buffer = _interopDefault(require('buffer'));
var events = _interopDefault(require('events'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var zlib = _interopDefault(require('zlib'));
var tty = _interopDefault(require('tty'));
var string_decoder = _interopDefault(require('string_decoder'));
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

'use strict';

/*
 * Displays a helpful message and the source of
 * the format when it is invalid.
 */
class InvalidFormatError extends Error {
  constructor(formatFn) {
    super(`Format functions must be synchronous taking a two arguments: (info, opts)
Found: ${formatFn.toString().split('\n')[0]}\n`);

    Error.captureStackTrace(this, InvalidFormatError);
  }
}

/*
 * function format (formatFn)
 * Returns a create function for the `formatFn`.
 */
var format = formatFn => {
  if (formatFn.length > 2) {
    throw new InvalidFormatError(formatFn);
  }

  /*
   * function Format (options)
   * Base prototype which calls a `_format`
   * function and pushes the result.
   */
  function Format(options = {}) {
    this.options = options;
  }

  Format.prototype.transform = formatFn;

  //
  // Create a function which returns new instances of
  // FormatWrap for simple syntax like:
  //
  // require('winston').formats.json();
  //
  function createFormatWrap(opts) {
    return new Format(opts);
  }

  //
  // Expose the FormatWrap through the create function
  // for testability.
  //
  createFormatWrap.Format = Format;
  return createFormatWrap;
};

var styles_1 = createCommonjsModule(function (module) {
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49],

};

Object.keys(codes).forEach(function(key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});
});

/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';

var hasFlag = function(flag, argv) {
  argv = argv || process.argv;

  var terminatorPos = argv.indexOf('--');
  var prefix = /^-{1,2}/.test(flag) ? '' : '--';
  var pos = argv.indexOf(prefix + flag);

  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

'use strict';




var env = process.env;

var forceColor = void 0;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
  forceColor = false;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')
           || hasFlag('color=always')) {
  forceColor = true;
}
if ('FORCE_COLOR' in env) {
  forceColor = env.FORCE_COLOR.length === 0
    || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
  if (level === 0) {
    return false;
  }

  return {
    level: level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  };
}

function supportsColor(stream$$1) {
  if (forceColor === false) {
    return 0;
  }

  if (hasFlag('color=16m') || hasFlag('color=full')
      || hasFlag('color=truecolor')) {
    return 3;
  }

  if (hasFlag('color=256')) {
    return 2;
  }

  if (stream$$1 && !stream$$1.isTTY && forceColor !== true) {
    return 0;
  }

  var min = forceColor ? 1 : 0;

  if (process.platform === 'win32') {
    // Node.js 7.5.0 is the first version of Node.js to include a patch to
    // libuv that enables 256 color output on Windows. Anything earlier and it
    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
    // release, and Node.js 7 is not. Windows 10 build 10586 is the first
    // Windows release that supports 256 colors. Windows 10 build 14931 is the
    // first release that supports 16m/TrueColor.
    var osRelease = os.release().split('.');
    if (Number(process.versions.node.split('.')[0]) >= 8
        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }

    return 1;
  }

  if ('CI' in env) {
    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
      return sign in env;
    }) || env.CI_NAME === 'codeship') {
      return 1;
    }

    return min;
  }

  if ('TEAMCITY_VERSION' in env) {
    return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
    );
  }

  if ('TERM_PROGRAM' in env) {
    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2;
      case 'Hyper':
        return 3;
      case 'Apple_Terminal':
        return 2;
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }

  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }

  if ('COLORTERM' in env) {
    return 1;
  }

  if (env.TERM === 'dumb') {
    return min;
  }

  return min;
}

function getSupportLevel(stream$$1) {
  var level = supportsColor(stream$$1);
  return translateLevel(level);
}

var supportsColors = {
  supportsColor: getSupportLevel,
  stdout: getSupportLevel(process.stdout),
  stderr: getSupportLevel(process.stderr),
};
var supportsColors_1 = supportsColors.supportsColor;
var supportsColors_2 = supportsColors.stdout;
var supportsColors_3 = supportsColors.stderr;

var trap = createCommonjsModule(function (module) {
module['exports'] = function runTheTrap(text, options) {
  var result = '';
  text = text || 'Run the trap, drop the bass';
  text = text.split('');
  var trap = {
    a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
    b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
    c: ['\u00a9', '\u023b', '\u03fe'],
    d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
    e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc',
      '\u0a6c'],
    f: ['\u04fa'],
    g: ['\u0262'],
    h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
    i: ['\u0f0f'],
    j: ['\u0134'],
    k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
    l: ['\u0139'],
    m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
    n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
    o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd',
      '\u06dd', '\u0e4f'],
    p: ['\u01f7', '\u048e'],
    q: ['\u09cd'],
    r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
    s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
    t: ['\u0141', '\u0166', '\u0373'],
    u: ['\u01b1', '\u054d'],
    v: ['\u05d8'],
    w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
    x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
    y: ['\u00a5', '\u04b0', '\u04cb'],
    z: ['\u01b5', '\u0240'],
  };
  text.forEach(function(c) {
    c = c.toLowerCase();
    var chars = trap[c] || [' '];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== 'undefined') {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;
};
});

var zalgo = createCommonjsModule(function (module) {
// please no
module['exports'] = function zalgo(text, options) {
  text = text || '   he is here   ';
  var soul = {
    'up': [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚',
    ],
    'down': [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣',
    ],
    'mid': [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉',
    ],
  };
  var all = [].concat(soul.up, soul.down, soul.mid);

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function isChar(character) {
    var bool = false;
    all.filter(function(i) {
      bool = (i === character);
    });
    return bool;
  }


  function heComes(text, options) {
    var result = '';
    var counts;
    var l;
    options = options || {};
    options['up'] =
      typeof options['up'] !== 'undefined' ? options['up'] : true;
    options['mid'] =
      typeof options['mid'] !== 'undefined' ? options['mid'] : true;
    options['down'] =
      typeof options['down'] !== 'undefined' ? options['down'] : true;
    options['size'] =
      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
    text = text.split('');
    for (l in text) {
      if (isChar(l)) {
        continue;
      }
      result = result + text[l];
      counts = {'up': 0, 'down': 0, 'mid': 0};
      switch (options.size) {
        case 'mini':
          counts.up = randomNumber(8);
          counts.mid = randomNumber(2);
          counts.down = randomNumber(8);
          break;
        case 'maxi':
          counts.up = randomNumber(16) + 3;
          counts.mid = randomNumber(4) + 1;
          counts.down = randomNumber(64) + 3;
          break;
        default:
          counts.up = randomNumber(8) + 1;
          counts.mid = randomNumber(6) / 2;
          counts.down = randomNumber(8) + 1;
          break;
      }

      var arr = ['up', 'mid', 'down'];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text, options);
};
});

var america = createCommonjsModule(function (module) {
module['exports'] = function(colors) {
  return function(letter, i, exploded) {
    if (letter === ' ') return letter;
    switch (i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter);
      case 2: return colors.blue(letter);
    }
  };
};
});

var zebra = createCommonjsModule(function (module) {
module['exports'] = function(colors) {
  return function(letter, i, exploded) {
    return i % 2 === 0 ? letter : colors.inverse(letter);
  };
};
});

var rainbow = createCommonjsModule(function (module) {
module['exports'] = function(colors) {
  // RoY G BiV
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
  return function(letter, i, exploded) {
    if (letter === ' ') {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
};
});

var random = createCommonjsModule(function (module) {
module['exports'] = function(colors) {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
    'blue', 'white', 'cyan', 'magenta'];
  return function(letter, i, exploded) {
    return letter === ' ' ? letter :
      colors[
          available[Math.round(Math.random() * (available.length - 2))]
      ](letter);
  };
};
});

var colors_1 = createCommonjsModule(function (module) {
/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};


var ansiStyles = colors.styles = styles_1;
var defineProps = Object.defineProperties;
var newLineRegex = new RegExp(/[\r\n]+/g);

colors.supportsColor = supportsColors.supportsColor;

if (typeof colors.enabled === 'undefined') {
  colors.enabled = colors.supportsColor() !== false;
}

colors.enable = function() {
  colors.enabled = true;
};

colors.disable = function() {
  colors.enabled = false;
};

colors.stripColors = colors.strip = function(str) {
  return ('' + str).replace(/\x1B\[\d+m/g, '');
};

// eslint-disable-next-line no-unused-vars
var stylize = colors.stylize = function stylize(str, style) {
  if (!colors.enabled) {
    return str+'';
  }

  return ansiStyles[style].open + str + ansiStyles[style].close;
};

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function() {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function(key) {
    ansiStyles[key].closeRe =
      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function() {
        return build(this._styles.concat(key));
      },
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = Array.prototype.slice.call(arguments);

  var str = args.map(function(arg) {
    if (arg !== undefined && arg.constructor === String) {
      return arg;
    } else {
      return util.inspect(arg);
    }
  }).join(' ');

  if (!colors.enabled || !str) {
    return str;
  }

  var newLinesPresent = str.indexOf('\n') != -1;

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
    if (newLinesPresent) {
      str = str.replace(newLineRegex, function(match) {
        return code.close + match + code.open;
      });
    }
  }

  return str;
}

colors.setTheme = function(theme) {
  if (typeof theme === 'string') {
    console.log('colors.setTheme now only accepts an object, not a string.  ' +
      'If you are trying to set a theme from a file, it is now your (the ' +
      'caller\'s) responsibility to require the file.  The old syntax ' +
      'looked like colors.setTheme(__dirname + ' +
      '\'/../themes/generic-logging.js\'); The new syntax looks like '+
      'colors.setTheme(require(__dirname + ' +
      '\'/../themes/generic-logging.js\'));');
    return;
  }
  for (var style in theme) {
    (function(style) {
      colors[style] = function(str) {
        if (typeof theme[style] === 'object') {
          var out = str;
          for (var i in theme[style]) {
            out = colors[theme[style][i]](out);
          }
          return out;
        }
        return colors[theme[style]](str);
      };
    })(style);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function(name) {
    ret[name] = {
      get: function() {
        return build([name]);
      },
    };
  });
  return ret;
}

var sequencer = function sequencer(map, str) {
  var exploded = str.split('');
  exploded = exploded.map(map);
  return exploded.join('');
};

// custom formatter methods
colors.trap = trap;
colors.zalgo = zalgo;

// maps
colors.maps = {};
colors.maps.america = america(colors);
colors.maps.zebra = zebra(colors);
colors.maps.rainbow = rainbow(colors);
colors.maps.random = random(colors);

for (var map in colors.maps) {
  (function(map) {
    colors[map] = function(str) {
      return sequencer(colors.maps[map], str);
    };
  })(map);
}

defineProps(colors, init());
});

var safe = createCommonjsModule(function (module) {
//
// Remark: Requiring this file will use the "safe" colors API,
// which will not touch String.prototype.
//
//   var colors = require('colors/safe');
//   colors.red("foo")
//
//

module['exports'] = colors_1;
});

/**
 * cli.js: Config that conform to commonly used CLI logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * Default levels for the CLI configuration.
 * @type {Object}
 */
var levels = {
  error: 0,
  warn: 1,
  help: 2,
  data: 3,
  info: 4,
  debug: 5,
  prompt: 6,
  verbose: 7,
  input: 8,
  silly: 9
};

/**
 * Default colors for the CLI configuration.
 * @type {Object}
 */
var colors = {
  error: 'red',
  warn: 'yellow',
  help: 'cyan',
  data: 'grey',
  info: 'green',
  debug: 'blue',
  prompt: 'grey',
  verbose: 'cyan',
  input: 'grey',
  silly: 'magenta'
};

var cli = {
	levels: levels,
	colors: colors
};

/**
 * npm.js: Config that conform to npm logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * Default levels for the npm configuration.
 * @type {Object}
 */
var levels$1 = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
};

/**
 * Default levels for the npm configuration.
 * @type {Object}
 */
var colors$1 = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'magenta'
};

var npm = {
	levels: levels$1,
	colors: colors$1
};

/**
 * syslog.js: Config that conform to syslog logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * Default levels for the syslog configuration.
 * @type {Object}
 */
var levels$2 = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
};

/**
 * Default levels for the syslog configuration.
 * @type {Object}
 */
var colors$2 = {
  emerg: 'red',
  alert: 'yellow',
  crit: 'red',
  error: 'red',
  warning: 'red',
  notice: 'yellow',
  info: 'green',
  debug: 'blue'
};

var syslog = {
	levels: levels$2,
	colors: colors$2
};

var config = createCommonjsModule(function (module, exports) {
/**
 * index.js: Default settings for all levels that winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * Export config set for the CLI.
 * @type {Object}
 */
Object.defineProperty(exports, 'cli', {
  value: cli
});

/**
 * Export config set for npm.
 * @type {Object}
 */
Object.defineProperty(exports, 'npm', {
  value: npm
});

/**
 * Export config set for the syslog.
 * @type {Object}
 */
Object.defineProperty(exports, 'syslog', {
  value: syslog
});
});

var tripleBeam = createCommonjsModule(function (module, exports) {
'use strict';

/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden level identifier
 * to allow the readable level property to be mutable for
 * operations like colorization
 *
 * @type {Symbol}
 */
Object.defineProperty(exports, 'LEVEL', {
  value: Symbol.for('level')
});

/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden message identifier
 * to allow the final message property to not have
 * side effects on another.
 *
 * @type {Symbol}
 */
Object.defineProperty(exports, 'MESSAGE', {
  value: Symbol.for('message')
});

/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden message identifier
 * to allow the extracted splat property be hidden
 *
 * @type {Symbol}
 */
Object.defineProperty(exports, 'SPLAT', {
  value: Symbol.for('splat')
});

/**
 * A shareable object constant  that can be used
 * as a standard configuration for winston@3.
 *
 * @type {Object}
 */
Object.defineProperty(exports, 'configs', {
  value: config
});
});

var colorize = createCommonjsModule(function (module) {
'use strict';


const { LEVEL } = tripleBeam;

//
// Fix colors not appearing in non-tty environments
//
safe.enabled = true;

/**
 * @property {RegExp} hasSpace
 * Simple regex to check for presence of spaces.
 */
const hasSpace = /\s+/;

/*
 * Colorizer format. Wraps the `level` and/or `message` properties
 * of the `info` objects with ANSI color codes based on a few options.
 */
class Colorizer {
  constructor(opts = {}) {
    if (opts.colors) {
      this.addColors(opts.colors);
    }

    this.options = opts;
  }

  /*
   * Adds the colors Object to the set of allColors
   * known by the Colorizer
   *
   * @param {Object} colors Set of color mappings to add.
   */
  static addColors(clrs) {
    const nextColors = Object.keys(clrs).reduce((acc, level) => {
      acc[level] = hasSpace.test(clrs[level])
        ? clrs[level].split(hasSpace)
        : clrs[level];

      return acc;
    }, {});

    Colorizer.allColors = Object.assign({}, Colorizer.allColors || {}, nextColors);
    return Colorizer.allColors;
  }

  /*
   * Adds the colors Object to the set of allColors
   * known by the Colorizer
   *
   * @param {Object} colors Set of color mappings to add.
   */
  addColors(clrs) {
    return Colorizer.addColors(clrs);
  }

  /*
   * function colorize (lookup, level, message)
   * Performs multi-step colorization using colors/safe
   */
  colorize(lookup, level, message) {
    if (typeof message === 'undefined') {
      message = level;
    }

    //
    // If the color for the level is just a string
    // then attempt to colorize the message with it.
    //
    if (!Array.isArray(Colorizer.allColors[lookup])) {
      return safe[Colorizer.allColors[lookup]](message);
    }

    //
    // If it is an Array then iterate over that Array, applying
    // the colors function for each item.
    //
    for (let i = 0, len = Colorizer.allColors[lookup].length; i < len; i++) {
      message = safe[Colorizer.allColors[lookup][i]](message);
    }

    return message;
  }

  /*
   * function transform (info, opts)
   * Attempts to colorize the { level, message } of the given
   * `logform` info object.
   */
  transform(info, opts) {
    if (opts.level || opts.all || !opts.message) {
      info.level = this.colorize(info[LEVEL], info.level);
    }

    if (opts.all || opts.message) {
      info.message = this.colorize(info[LEVEL], info.level, info.message);
    }

    return info;
  }
}

/*
 * function colorize (info)
 * Returns a new instance of the colorize Format that applies
 * level colors to `info` objects. This was previously exposed
 * as { colorize: true } to transports in `winston < 3.0.0`.
 */
module.exports = opts => new Colorizer(opts);

//
// Attach the Colorizer for registration purposes
//
module.exports.Colorizer
  = module.exports.Format
  = Colorizer;
});
var colorize_1 = colorize.Colorizer;
var colorize_2 = colorize.Format;

'use strict';

const { Colorizer } = colorize;

/*
 * Simple method to register colors with a simpler require
 * path within the module.
 */
var levels$3 = config => {
  Colorizer.addColors(config.colors || config);
  return config;
};

var logform = createCommonjsModule(function (module, exports) {
'use strict';

/*
 * @api public
 * @property {function} format
 * Both the construction method and set of exposed
 * formats.
 */
const format$$1 = exports.format = format;

/*
 * @api public
 * @method {function} levels
 * Registers the specified levels with logform.
 */
exports.levels = levels$3;

/*
 * @api private
 * method {function} exposeFormat
 * Exposes a sub-format on the main format object
 * as a lazy-loaded getter.
 */
function exposeFormat(name, path$$1) {
  path$$1 = path$$1 || name;
  Object.defineProperty(format$$1, name, {
    get() {
      return commonjsRequire(`./${path$$1}.js`);
    },
    configurable: true
  });
}

//
// Setup all transports as lazy-loaded getters.
//
exposeFormat('align');
exposeFormat('cli');
exposeFormat('combine');
exposeFormat('colorize');
exposeFormat('json');
exposeFormat('label');
exposeFormat('logstash');
exposeFormat('metadata');
exposeFormat('ms');
exposeFormat('padLevels', 'pad-levels');
exposeFormat('prettyPrint', 'pretty-print');
exposeFormat('printf');
exposeFormat('simple');
exposeFormat('splat');
exposeFormat('timestamp');
exposeFormat('uncolorize');
});
var logform_1 = logform.format;
var logform_2 = logform.levels;

var common = createCommonjsModule(function (module, exports) {
/**
 * common.js: Internal helper and utility functions for winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

const { format } = util;

/**
 * Set of simple deprecation notices and a way to expose them for a set of
 * properties.
 * @type {Object}
 * @private
 */
exports.warn = {
  deprecated(prop) {
    return () => {
      throw new Error(format('{ %s } was removed in winston@3.0.0.', prop));
    };
  },
  useFormat(prop) {
    return () => {
      throw new Error([
        format('{ %s } was removed in winston@3.0.0.', prop),
        'Use a custom winston.format = winston.format(function) instead.'
      ].join('\n'));
    };
  },
  forFunctions(obj, type, props) {
    props.forEach(prop => {
      obj[prop] = exports.warn[type](prop);
    });
  },
  moved(obj, movedTo, prop) {
    function movedNotice() {
      return () => {
        throw new Error([
          format('winston.%s was moved in winston@3.0.0.', prop),
          format('Use a winston.%s instead.', movedTo)
        ].join('\n'));
      };
    }

    Object.defineProperty(obj, prop, {
      get: movedNotice,
      set: movedNotice
    });
  },
  forProperties(obj, type, props) {
    props.forEach(prop => {
      const notice = exports.warn[type](prop);
      Object.defineProperty(obj, prop, {
        get: notice,
        set: notice
      });
    });
  }
};
});
var common_1 = common.warn;

var _from = "winston";
var _id = "winston@3.1.0";
var _inBundle = false;
var _integrity = "sha512-FsQfEE+8YIEeuZEYhHDk5cILo1HOcWkGwvoidLrDgPog0r4bser1lEIOco2dN9zpDJ1M88hfDgZvxe5z4xNcwg==";
var _location = "/winston";
var _phantomChildren = {
};
var _requested = {
	type: "tag",
	registry: true,
	raw: "winston",
	name: "winston",
	escapedName: "winston",
	rawSpec: "",
	saveSpec: null,
	fetchSpec: "latest"
};
var _requiredBy = [
	"#USER",
	"/"
];
var _resolved = "https://registry.npmjs.org/winston/-/winston-3.1.0.tgz";
var _shasum = "80724376aef164e024f316100d5b178d78ac5331";
var _spec = "winston";
var _where = "/home/mark/Downloads/temp/winston";
var author = {
	name: "Charlie Robbins",
	email: "charlie.robbins@gmail.com"
};
var bugs = {
	url: "https://github.com/winstonjs/winston/issues"
};
var bundleDependencies = false;
var dependencies = {
	async: "^2.6.0",
	diagnostics: "^1.1.1",
	"is-stream": "^1.1.0",
	logform: "^1.9.1",
	"one-time": "0.0.4",
	"readable-stream": "^2.3.6",
	"stack-trace": "0.0.x",
	"triple-beam": "^1.3.0",
	"winston-transport": "^4.2.0"
};
var deprecated = false;
var description = "A logger for just about everything.";
var devDependencies = {
	"@types/node": "^10.9.3",
	"abstract-winston-transport": ">= 0.5.1",
	assume: "^2.1.0",
	colors: "^1.3.2",
	"cross-spawn-async": "^2.0.0",
	"eslint-config-populist": "^4.1.0",
	hock: "^1.3.3",
	mocha: "^5.2.0",
	nyc: "^13.0.1",
	rimraf: "^2.6.2",
	split2: "^3.0.0",
	"std-mocks": "^1.0.0",
	through2: "^2.0.0",
	"winston-compat": "^0.1.1"
};
var engines = {
	node: ">= 6.4.0"
};
var homepage = "https://github.com/winstonjs/winston#readme";
var keywords = [
	"winston",
	"logger",
	"logging",
	"logs",
	"sysadmin",
	"bunyan",
	"pino",
	"loglevel",
	"tools",
	"json",
	"stream"
];
var license = "MIT";
var main = "./lib/winston";
var maintainers = [
	{
		name: "Jarrett Cruger",
		email: "jcrugzz@gmail.com"
	},
	{
		name: "Chris Alderson",
		email: "chrisalderson@protonmail.com"
	},
	{
		name: "David Hyde",
		email: "dabh@stanford.edu"
	}
];
var name = "winston";
var repository = {
	type: "git",
	url: "git+https://github.com/winstonjs/winston.git"
};
var scripts = {
	lint: "populist lib/*.js lib/winston/*.js lib/winston/**/*.js",
	pretest: "npm run lint",
	test: "nyc --reporter=text --reporter lcov npm run test:mocha",
	"test:mocha": "mocha test/*.test.js test/**/*.test.js --exit"
};
var types = "./index.d.ts";
var version = "3.1.0";
var _package = {
	_from: _from,
	_id: _id,
	_inBundle: _inBundle,
	_integrity: _integrity,
	_location: _location,
	_phantomChildren: _phantomChildren,
	_requested: _requested,
	_requiredBy: _requiredBy,
	_resolved: _resolved,
	_shasum: _shasum,
	_spec: _spec,
	_where: _where,
	author: author,
	bugs: bugs,
	bundleDependencies: bundleDependencies,
	dependencies: dependencies,
	deprecated: deprecated,
	description: description,
	devDependencies: devDependencies,
	engines: engines,
	homepage: homepage,
	keywords: keywords,
	license: license,
	main: main,
	maintainers: maintainers,
	name: name,
	repository: repository,
	scripts: scripts,
	types: types,
	version: version
};

var _package$1 = /*#__PURE__*/Object.freeze({
	_from: _from,
	_id: _id,
	_inBundle: _inBundle,
	_integrity: _integrity,
	_location: _location,
	_phantomChildren: _phantomChildren,
	_requested: _requested,
	_requiredBy: _requiredBy,
	_resolved: _resolved,
	_shasum: _shasum,
	_spec: _spec,
	_where: _where,
	author: author,
	bugs: bugs,
	bundleDependencies: bundleDependencies,
	dependencies: dependencies,
	deprecated: deprecated,
	description: description,
	devDependencies: devDependencies,
	engines: engines,
	homepage: homepage,
	keywords: keywords,
	license: license,
	main: main,
	maintainers: maintainers,
	name: name,
	repository: repository,
	scripts: scripts,
	types: types,
	version: version,
	default: _package
});

var processNextickArgs = createCommonjsModule(function (module) {
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}
});
var processNextickArgs_1 = processNextickArgs.nextTick;

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
var isArray_1 = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
var isBoolean_1 = isBoolean;

function isNull(arg) {
  return arg === null;
}
var isNull_1 = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
var isNullOrUndefined_1 = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
var isNumber_1 = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
var isString_1 = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
var isSymbol_1 = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
var isUndefined_1 = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
var isRegExp_1 = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
var isObject_1 = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
var isDate_1 = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
var isError_1 = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
var isFunction_1 = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
var isPrimitive_1 = isPrimitive;

var isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

var util$1 = {
	isArray: isArray_1,
	isBoolean: isBoolean_1,
	isNull: isNull_1,
	isNullOrUndefined: isNullOrUndefined_1,
	isNumber: isNumber_1,
	isString: isString_1,
	isSymbol: isSymbol_1,
	isUndefined: isUndefined_1,
	isRegExp: isRegExp_1,
	isObject: isObject_1,
	isDate: isDate_1,
	isError: isError_1,
	isFunction: isFunction_1,
	isPrimitive: isPrimitive_1,
	isBuffer: isBuffer
};

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util$$1 = util;
  if (typeof util$$1.inherits !== 'function') throw '';
  module.exports = util$$1.inherits;
} catch (e) {
  module.exports = inherits_browser;
}
});

/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */

var node = util.deprecate;

var stream$1 = stream;

var safeBuffer = createCommonjsModule(function (module, exports) {
/* eslint-disable node/no-deprecated-api */

var Buffer = buffer.Buffer;

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key];
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer;
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports);
  exports.Buffer = SafeBuffer;
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
};

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size);
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
  } else {
    buf.fill(0);
  }
  return buf
};

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
};

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
};
});
var safeBuffer_1 = safeBuffer.Buffer;

'use strict';

/*<replacement>*/


/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextickArgs.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextickArgs.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

var destroy_1 = {
  destroy: destroy,
  undestroy: undestroy
};
var destroy_2 = destroy_1.destroy;
var destroy_3 = destroy_1.undestroy;

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var BufferList = createCommonjsModule(function (module) {
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = safeBuffer.Buffer;


function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
});

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer$1 = safeBuffer.Buffer;
/*</replacement>*/

var isEncoding = Buffer$1.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
}

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer$1.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var StringDecoder_1 = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer$1.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

var string_decoder$1 = {
	StringDecoder: StringDecoder_1
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/


/*</replacement>*/

var _stream_readable = Readable;

/*<replacement>*/

/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = events.EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/

/*</replacement>*/

/*<replacement>*/

var Buffer$2 = safeBuffer.Buffer;
var OurUint8Array = commonjsGlobal.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer$2.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer$2.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/

util$1.inherits = inherits;
/*</replacement>*/

/*<replacement>*/

var debug = void 0;
if (util && util.debuglog) {
  debug = util.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/



var StringDecoder$1;

util$1.inherits(Readable, stream$1);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isarray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream$$1) {
  Duplex = Duplex || _stream_duplex;

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream$$1 instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder$1) StringDecoder$1 = string_decoder$1.StringDecoder;
    this.decoder = new StringDecoder$1(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || _stream_duplex;

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  stream$1.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroy_1.destroy;
Readable.prototype._undestroy = destroy_1.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer$2.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream$$1, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream$$1._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream$$1, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream$$1.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer$2.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream$$1.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream$$1, state, chunk, true);
      } else if (state.ended) {
        stream$$1.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream$$1, state, chunk, false);else maybeReadMore(stream$$1, state);
        } else {
          addChunk(stream$$1, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream$$1, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream$$1.emit('data', chunk);
    stream$$1.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream$$1);
  }
  maybeReadMore(stream$$1, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder$1) StringDecoder$1 = string_decoder$1.StringDecoder;
  this._readableState.decoder = new StringDecoder$1(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream$$1, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream$$1);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream$$1) {
  var state = stream$$1._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextickArgs.nextTick(emitReadable_, stream$$1);else emitReadable_(stream$$1);
  }
}

function emitReadable_(stream$$1) {
  debug('emit readable');
  stream$$1.emit('readable');
  flow(stream$$1);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream$$1, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextickArgs.nextTick(maybeReadMore_, stream$$1, state);
  }
}

function maybeReadMore_(stream$$1, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream$$1.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextickArgs.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = stream$1.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextickArgs.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream$$1, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextickArgs.nextTick(resume_, stream$$1, state);
  }
}

function resume_(stream$$1, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream$$1.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream$$1.emit('resume');
  flow(stream$$1);
  if (state.flowing && !state.reading) stream$$1.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream$$1) {
  var state = stream$$1._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream$$1.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream$$1) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream$$1.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream$$1.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream$$1.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream$$1) {
    if (this[i] === undefined && typeof stream$$1[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream$$1[method].apply(stream$$1, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream$$1.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream$$1.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer$2.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream$$1) {
  var state = stream$$1._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextickArgs.nextTick(endReadableNT, state, stream$$1);
  }
}

function endReadableNT(state, stream$$1) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream$$1.readable = false;
    stream$$1.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/


/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

var _stream_duplex = Duplex$1;

/*<replacement>*/

util$1.inherits = inherits;
/*</replacement>*/




util$1.inherits(Duplex$1, _stream_readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(_stream_writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex$1.prototype[method]) Duplex$1.prototype[method] = _stream_writable.prototype[method];
  }
}

function Duplex$1(options) {
  if (!(this instanceof Duplex$1)) return new Duplex$1(options);

  _stream_readable.call(this, options);
  _stream_writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex$1.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextickArgs.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex$1.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex$1.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextickArgs.nextTick(cb, err);
};

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/


/*</replacement>*/

var _stream_writable = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextickArgs.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex$2;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/

util$1.inherits = inherits;
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: node
};
/*</replacement>*/

/*<replacement>*/

/*</replacement>*/

/*<replacement>*/

var Buffer$3 = safeBuffer.Buffer;
var OurUint8Array$1 = commonjsGlobal.Uint8Array || function () {};
function _uint8ArrayToBuffer$1(chunk) {
  return Buffer$3.from(chunk);
}
function _isUint8Array$1(obj) {
  return Buffer$3.isBuffer(obj) || obj instanceof OurUint8Array$1;
}

/*</replacement>*/



util$1.inherits(Writable, stream$1);

function nop() {}

function WritableState(options, stream$$1) {
  Duplex$2 = Duplex$2 || _stream_duplex;

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream$$1 instanceof Duplex$2;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream$$1, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex$2 = Duplex$2 || _stream_duplex;

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex$2)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  stream$1.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream$$1, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream$$1.emit('error', er);
  processNextickArgs.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream$$1, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream$$1.emit('error', er);
    processNextickArgs.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array$1(chunk);

  if (isBuf && !Buffer$3.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer$1(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer$3.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream$$1, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream$$1, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream$$1, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream$$1._writev(chunk, state.onwrite);else stream$$1._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream$$1, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextickArgs.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextickArgs.nextTick(finishMaybe, stream$$1, state);
    stream$$1._writableState.errorEmitted = true;
    stream$$1.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream$$1._writableState.errorEmitted = true;
    stream$$1.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream$$1, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream$$1, er) {
  var state = stream$$1._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream$$1, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream$$1, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream$$1, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream$$1, state, finished, cb);
    }
  }
}

function afterWrite(stream$$1, state, finished, cb) {
  if (!finished) onwriteDrain(stream$$1, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream$$1, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream$$1, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream$$1.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream$$1, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream$$1._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer$$1 = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer$$1[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer$$1.allBuffers = allBuffers;

    doWrite(stream$$1, state, true, state.length, buffer$$1, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream$$1, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream$$1, state) {
  stream$$1._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream$$1.emit('error', err);
    }
    state.prefinished = true;
    stream$$1.emit('prefinish');
    finishMaybe(stream$$1, state);
  });
}
function prefinish(stream$$1, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream$$1._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextickArgs.nextTick(callFinal, stream$$1, state);
    } else {
      state.prefinished = true;
      stream$$1.emit('prefinish');
    }
  }
}

function finishMaybe(stream$$1, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream$$1, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream$$1.emit('finish');
    }
  }
  return need;
}

function endWritable(stream$$1, state, cb) {
  state.ending = true;
  finishMaybe(stream$$1, state);
  if (cb) {
    if (state.finished) processNextickArgs.nextTick(cb);else stream$$1.once('finish', cb);
  }
  state.ended = true;
  stream$$1.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroy_1.destroy;
Writable.prototype._undestroy = destroy_1.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};

var writable = createCommonjsModule(function (module) {
if (process.env.READABLE_STREAM === 'disable') {
  module.exports = stream && stream.Writable || _stream_writable;
} else {
  module.exports = _stream_writable;
}
});

var winstonTransport = createCommonjsModule(function (module) {
'use strict';



const { LEVEL } = tripleBeam;

/**
 * Constructor function for the TransportStream. This is the base prototype
 * that all `winston >= 3` transports should inherit from.
 * @param {Object} options - Options for this TransportStream instance
 * @param {String} options.level - Highest level according to RFC5424.
 * @param {Boolean} options.handleExceptions - If true, info with
 * { exception: true } will be written.
 * @param {Function} options.log - Custom log function for simple Transport
 * creation
 * @param {Function} options.close - Called on "unpipe" from parent.
 */
const TransportStream = module.exports = function TransportStream(options = {}) {
  writable.call(this, { objectMode: true, highWaterMark: options.highWaterMark });

  this.format = options.format;
  this.level = options.level;
  this.handleExceptions = options.handleExceptions;
  this.silent = options.silent;

  if (options.log) this.log = options.log;
  if (options.logv) this.logv = options.logv;
  if (options.close) this.close = options.close;

  // Get the levels from the source we are piped from.
  this.once('pipe', logger => {
    // Remark (indexzero): this bookkeeping can only support multiple
    // Logger parents with the same `levels`. This comes into play in
    // the `winston.Container` code in which `container.add` takes
    // a fully realized set of options with pre-constructed TransportStreams.
    this.levels = logger.levels;
    this.parent = logger;
  });

  // If and/or when the transport is removed from this instance
  this.once('unpipe', src => {
    // Remark (indexzero): this bookkeeping can only support multiple
    // Logger parents with the same `levels`. This comes into play in
    // the `winston.Container` code in which `container.add` takes
    // a fully realized set of options with pre-constructed TransportStreams.
    if (src === this.parent) {
      this.parent = null;
      if (this.close) {
        this.close();
      }
    }
  });
};

/*
 * Inherit from Writeable using Node.js built-ins
 */
util.inherits(TransportStream, writable);

/**
 * Writes the info object to our transport instance.
 * @param {mixed} info - TODO: add param description.
 * @param {mixed} enc - TODO: add param description.
 * @param {function} callback - TODO: add param description.
 * @returns {undefined}
 * @private
 */
TransportStream.prototype._write = function _write(info, enc, callback) {
  if (this.silent || (info.exception === true && !this.handleExceptions)) {
    return callback(null);
  }

  // Remark: This has to be handled in the base transport now because we
  // cannot conditionally write to our pipe targets as stream. We always
  // prefer any explicit level set on the Transport itself falling back to
  // any level set on the parent.
  const level = this.level || (this.parent && this.parent.level);

  if (!level || this.levels[level] >= this.levels[info[LEVEL]]) {
    if (info && !this.format) {
      return this.log(info, callback);
    }

    let errState;
    let transformed;

    // We trap(and re-throw) any errors generated by the user-provided format, but also
    // guarantee that the streams callback is invoked so that we can continue flowing.
    try {
      transformed = this.format.transform(Object.assign({}, info), this.format.options);
    } catch (err) {
      errState = err;
    }

    if (errState || !transformed) {
      // eslint-disable-next-line callback-return
      callback();
      if (errState) throw errState;
      return;
    }

    return this.log(transformed, callback);
  }

  return callback(null);
};

/**
 * Writes the batch of info objects (i.e. "object chunks") to our transport
 * instance after performing any necessary filtering.
 * @param {mixed} chunks - TODO: add params description.
 * @param {function} callback - TODO: add params description.
 * @returns {mixed} - TODO: add returns description.
 * @private
 */
TransportStream.prototype._writev = function _writev(chunks, callback) {
  if (this.logv) {
    const infos = chunks.filter(this._accept, this);
    if (!infos.length) {
      return callback(null);
    }

    // Remark (indexzero): from a performance perspective if Transport
    // implementers do choose to implement logv should we make it their
    // responsibility to invoke their format?
    return this.logv(infos, callback);
  }

  for (let i = 0; i < chunks.length; i++) {
    if (!this._accept(chunks[i])) continue;

    if (chunks[i].chunk && !this.format) {
      this.log(chunks[i].chunk, chunks[i].callback);
      continue;
    }

    let errState;
    let transformed;

    // We trap(and re-throw) any errors generated by the user-provided format, but also
    // guarantee that the streams callback is invoked so that we can continue flowing.
    try {
      transformed = this.format.transform(
        Object.assign({}, chunks[i].chunk),
        this.format.options
      );
    } catch (err) {
      errState = err;
    }

    if (errState || !transformed) {
      // eslint-disable-next-line callback-return
      chunks[i].callback();
      if (errState) {
        // eslint-disable-next-line callback-return
        callback(null);
        throw errState;
      }
    } else {
      this.log(transformed, chunks[i].callback);
    }
  }

  return callback(null);
};

/**
 * Predicate function that returns true if the specfied `info` on the
 * WriteReq, `write`, should be passed down into the derived
 * TransportStream's I/O via `.log(info, callback)`.
 * @param {WriteReq} write - winston@3 Node.js WriteReq for the `info` object
 * representing the log message.
 * @returns {Boolean} - Value indicating if the `write` should be accepted &
 * logged.
 */
TransportStream.prototype._accept = function _accept(write) {
  const info = write.chunk;
  if (this.silent) {
    return false;
  }

  // We always prefer any explicit level set on the Transport itself
  // falling back to any level set on the parent.
  const level = this.level || (this.parent && this.parent.level);

  // Immediately check the average case: log level filtering.
  if (
    info.exception === true ||
    !level ||
    this.levels[level] >= this.levels[info[LEVEL]]
  ) {
    // Ensure the info object is valid based on `{ exception }`:
    // 1. { handleExceptions: true }: all `info` objects are valid
    // 2. { exception: false }: accepted by all transports.
    if (this.handleExceptions || info.exception !== true) {
      return true;
    }
  }

  return false;
};

/**
 * _nop is short for "No operation"
 * @returns {Boolean} Intentionally false.
 */
TransportStream.prototype._nop = function _nop() {
  // eslint-disable-next-line no-undefined
  return void undefined;
};
});

/* eslint-disable no-console */
/*
 * console.js: Transport for outputting to the console.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';


const { LEVEL, MESSAGE } = tripleBeam;


/**
 * Transport for outputting to the console.
 * @type {Console}
 * @extends {TransportStream}
 */
var console_1 = class Console extends winstonTransport {
  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options = {}) {
    super(options);

    // Expose the name of this Transport on the prototype
    this.name = options.name || 'console';
    this.stderrLevels = this._stringArrayToSet(options.stderrLevels);
    this.consoleWarnLevels = this._stringArrayToSet(options.consoleWarnLevels);
    this.eol = options.eol || os.EOL;
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */
  log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    // Remark: what if there is no raw...?
    if (this.stderrLevels[info[LEVEL]]) {
      if (console._stderr) {
        // Node.js maps `process.stderr` to `console._stderr`.
        console._stderr.write(`${info[MESSAGE]}${this.eol}`);
      } else {
        // console.error adds a newline
        console.error(info[MESSAGE]);
      }

      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    } else if (this.consoleWarnLevels[info[LEVEL]]) {
      if (console._stderr) {
        // Node.js maps `process.stderr` to `console._stderr`.
        // in Node.js console.warn is an alias for console.error
        console._stderr.write(`${info[MESSAGE]}${this.eol}`);
      } else {
        // console.warn adds a newline
        console.warn(info[MESSAGE]);
      }

      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    }

    if (console._stdout) {
      // Node.js maps `process.stdout` to `console._stdout`.
      console._stdout.write(`${info[MESSAGE]}${this.eol}`);
    } else {
      // console.log adds a newline.
      console.log(info[MESSAGE]);
    }

    if (callback) {
      callback(); // eslint-disable-line callback-return
    }
  }

  /**
   * Returns a Set-like object with strArray's elements as keys (each with the
   * value true).
   * @param {Array} strArray - Array of Set-elements as strings.
   * @param {?string} [errMsg] - Custom error message thrown on invalid input.
   * @returns {Object} - TODO: add return description.
   * @private
   */
  _stringArrayToSet(strArray, errMsg) {
    if (!strArray)
      return {};

    errMsg = errMsg || 'Cannot make set from type other than Array of string elements';

    if (!Array.isArray(strArray)) {
      throw new Error(errMsg);
    }

    return strArray.reduce((set, el) =>  {
      if (typeof el !== 'string') {
        throw new Error(errMsg);
      }
      set[el] = true;

      return set;
    }, {});
  }
};

/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

var noop_1 = noop;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString$1;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1$1 = isObject$1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject_1$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1$1 = isFunction$1;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1$1(value);
}

var isArrayLike_1 = isArrayLike;

var slice_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = slice;
function slice(arrayLike, start) {
    start = start | 0;
    var newLen = Math.max(arrayLike.length - start, 0);
    var newArr = Array(newLen);
    for (var idx = 0; idx < newLen; idx++) {
        newArr[idx] = arrayLike[start + idx];
    }
    return newArr;
}
module.exports = exports["default"];
});

unwrapExports(slice_1);

var initialParams = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (fn) {
    return function () /*...args, callback*/{
        var args = (0, _slice2.default)(arguments);
        var callback = args.pop();
        fn.call(this, args, callback);
    };
};



var _slice2 = _interopRequireDefault(slice_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
});

unwrapExports(initialParams);

var setImmediate_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hasNextTick = exports.hasSetImmediate = undefined;
exports.fallback = fallback;
exports.wrap = wrap;



var _slice2 = _interopRequireDefault(slice_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === 'function' && setImmediate;
var hasNextTick = exports.hasNextTick = typeof process === 'object' && typeof process.nextTick === 'function';

function fallback(fn) {
    setTimeout(fn, 0);
}

function wrap(defer) {
    return function (fn /*, ...args*/) {
        var args = (0, _slice2.default)(arguments, 1);
        defer(function () {
            fn.apply(null, args);
        });
    };
}

var _defer;

if (hasSetImmediate) {
    _defer = setImmediate;
} else if (hasNextTick) {
    _defer = process.nextTick;
} else {
    _defer = fallback;
}

exports.default = wrap(_defer);
});

unwrapExports(setImmediate_1);
var setImmediate_2 = setImmediate_1.hasNextTick;
var setImmediate_3 = setImmediate_1.hasSetImmediate;
var setImmediate_4 = setImmediate_1.fallback;
var setImmediate_5 = setImmediate_1.wrap;

var asyncify_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = asyncify;



var _isObject2 = _interopRequireDefault(isObject_1$1);



var _initialParams2 = _interopRequireDefault(initialParams);



var _setImmediate2 = _interopRequireDefault(setImmediate_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */
function asyncify(func) {
    return (0, _initialParams2.default)(function (args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if ((0, _isObject2.default)(result) && typeof result.then === 'function') {
            result.then(function (value) {
                invokeCallback(callback, null, value);
            }, function (err) {
                invokeCallback(callback, err.message ? err : new Error(err));
            });
        } else {
            callback(null, result);
        }
    });
}

function invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (e) {
        (0, _setImmediate2.default)(rethrow, e);
    }
}

function rethrow(error) {
    throw error;
}
module.exports = exports['default'];
});

unwrapExports(asyncify_1);

var wrapAsync_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isAsync = undefined;



var _asyncify2 = _interopRequireDefault(asyncify_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var supportsSymbol = typeof Symbol === 'function';

function isAsync(fn) {
    return supportsSymbol && fn[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(asyncFn) {
    return isAsync(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
}

exports.default = wrapAsync;
exports.isAsync = isAsync;
});

unwrapExports(wrapAsync_1);
var wrapAsync_2 = wrapAsync_1.isAsync;

var parallel = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _parallel;



var _noop2 = _interopRequireDefault(noop_1);



var _isArrayLike2 = _interopRequireDefault(isArrayLike_1);



var _slice2 = _interopRequireDefault(slice_1);



var _wrapAsync2 = _interopRequireDefault(wrapAsync_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _parallel(eachfn, tasks, callback) {
    callback = callback || _noop2.default;
    var results = (0, _isArrayLike2.default)(tasks) ? [] : {};

    eachfn(tasks, function (task, key, callback) {
        (0, _wrapAsync2.default)(task)(function (err, result) {
            if (arguments.length > 2) {
                result = (0, _slice2.default)(arguments, 1);
            }
            results[key] = result;
            callback(err);
        });
    }, function (err) {
        callback(err, results);
    });
}
module.exports = exports['default'];
});

unwrapExports(parallel);

var once_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = once;
function once(fn) {
    return function () {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
});

unwrapExports(once_1);

var getIterator = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (coll) {
    return iteratorSymbol && coll[iteratorSymbol] && coll[iteratorSymbol]();
};

var iteratorSymbol = typeof Symbol === 'function' && Symbol.iterator;

module.exports = exports['default'];
});

unwrapExports(getIterator);

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$1.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray$1 = Array.isArray;

var isArray_1$1 = isArray$1;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1$1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys$1;

var iterator_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = iterator;



var _isArrayLike2 = _interopRequireDefault(isArrayLike_1);



var _getIterator2 = _interopRequireDefault(getIterator);



var _keys2 = _interopRequireDefault(keys_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? { value: coll[i], key: i } : null;
    };
}

function createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done) return null;
        i++;
        return { value: item.value, key: i };
    };
}

function createObjectIterator(obj) {
    var okeys = (0, _keys2.default)(obj);
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        return i < len ? { value: obj[key], key: key } : null;
    };
}

function iterator(coll) {
    if ((0, _isArrayLike2.default)(coll)) {
        return createArrayIterator(coll);
    }

    var iterator = (0, _getIterator2.default)(coll);
    return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}
module.exports = exports['default'];
});

unwrapExports(iterator_1);

var onlyOnce_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onlyOnce;
function onlyOnce(fn) {
    return function () {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, arguments);
    };
}
module.exports = exports["default"];
});

unwrapExports(onlyOnce_1);

var breakLoop = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
exports.default = {};
module.exports = exports["default"];
});

unwrapExports(breakLoop);

var eachOfLimit = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _eachOfLimit;



var _noop2 = _interopRequireDefault(noop_1);



var _once2 = _interopRequireDefault(once_1);



var _iterator2 = _interopRequireDefault(iterator_1);



var _onlyOnce2 = _interopRequireDefault(onlyOnce_1);



var _breakLoop2 = _interopRequireDefault(breakLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _eachOfLimit(limit) {
    return function (obj, iteratee, callback) {
        callback = (0, _once2.default)(callback || _noop2.default);
        if (limit <= 0 || !obj) {
            return callback(null);
        }
        var nextElem = (0, _iterator2.default)(obj);
        var done = false;
        var running = 0;
        var looping = false;

        function iterateeCallback(err, value) {
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            } else if (value === _breakLoop2.default || done && running <= 0) {
                done = true;
                return callback(null);
            } else if (!looping) {
                replenish();
            }
        }

        function replenish() {
            looping = true;
            while (running < limit && !done) {
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) {
                        callback(null);
                    }
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
            }
            looping = false;
        }

        replenish();
    };
}
module.exports = exports['default'];
});

unwrapExports(eachOfLimit);

var eachOfLimit_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachOfLimit$$1;



var _eachOfLimit3 = _interopRequireDefault(eachOfLimit);



var _wrapAsync2 = _interopRequireDefault(wrapAsync_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 */
function eachOfLimit$$1(coll, limit, iteratee, callback) {
  (0, _eachOfLimit3.default)(limit)(coll, (0, _wrapAsync2.default)(iteratee), callback);
}
module.exports = exports['default'];
});

unwrapExports(eachOfLimit_1);

var doLimit_1 = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = doLimit;
function doLimit(fn, limit) {
    return function (iterable, iteratee, callback) {
        return fn(iterable, limit, iteratee, callback);
    };
}
module.exports = exports["default"];
});

unwrapExports(doLimit_1);

var eachOfSeries = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _eachOfLimit2 = _interopRequireDefault(eachOfLimit_1);



var _doLimit2 = _interopRequireDefault(doLimit_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 */
exports.default = (0, _doLimit2.default)(_eachOfLimit2.default, 1);
module.exports = exports['default'];
});

unwrapExports(eachOfSeries);

var series_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = series;



var _parallel2 = _interopRequireDefault(parallel);



var _eachOfSeries2 = _interopRequireDefault(eachOfSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @example
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback){
 *         setTimeout(function() {
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     // results is now equal to: {one: 1, two: 2}
 * });
 */
function series(tasks, callback) {
  (0, _parallel2.default)(_eachOfSeries2.default, tasks, callback);
}
module.exports = exports['default'];
});

unwrapExports(series_1);

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

var _stream_transform = Transform;



/*<replacement>*/

util$1.inherits = inherits;
/*</replacement>*/

util$1.inherits(Transform, _stream_duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  _stream_duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish$1);
}

function prefinish$1() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return _stream_duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  _stream_duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream$$1, er, data) {
  if (er) return stream$$1.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream$$1.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream$$1._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream$$1._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream$$1.push(null);
}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

var _stream_passthrough = PassThrough;



/*<replacement>*/

util$1.inherits = inherits;
/*</replacement>*/

util$1.inherits(PassThrough, _stream_transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  _stream_transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

var readable = createCommonjsModule(function (module, exports) {
if (process.env.READABLE_STREAM === 'disable' && stream) {
  module.exports = stream;
  exports = module.exports = stream.Readable;
  exports.Readable = stream.Readable;
  exports.Writable = stream.Writable;
  exports.Duplex = stream.Duplex;
  exports.Transform = stream.Transform;
  exports.PassThrough = stream.PassThrough;
  exports.Stream = stream;
} else {
  exports = module.exports = _stream_readable;
  exports.Stream = stream || exports;
  exports.Readable = exports;
  exports.Writable = _stream_writable;
  exports.Duplex = _stream_duplex;
  exports.Transform = _stream_transform;
  exports.PassThrough = _stream_passthrough;
}
});
var readable_1 = readable.Readable;
var readable_2 = readable.Writable;
var readable_3 = readable.Duplex;
var readable_4 = readable.Transform;
var readable_5 = readable.PassThrough;
var readable_6 = readable.Stream;

'use strict';

var colorName = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

var isArrayish = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

var simpleSwizzle = createCommonjsModule(function (module) {
'use strict';



var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};
});

var colorString = createCommonjsModule(function (module) {
/* MIT license */



var reverseNames = {};

// create a list of reverse color names
for (var name in colorName) {
	if (colorName.hasOwnProperty(name)) {
		reverseNames[colorName[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorName[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = simpleSwizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = simpleSwizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = simpleSwizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = simpleSwizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = simpleSwizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}
});
var colorString_1 = colorString.to;
var colorString_2 = colorString.get;

var conversions = createCommonjsModule(function (module) {
/* MIT license */


// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in colorName) {
	if (colorName.hasOwnProperty(key)) {
		reverseKeywords[colorName[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in colorName) {
		if (colorName.hasOwnProperty(keyword)) {
			var value = colorName[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return colorName[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};
});
var conversions_1 = conversions.rgb;
var conversions_2 = conversions.hsl;
var conversions_3 = conversions.hsv;
var conversions_4 = conversions.hwb;
var conversions_5 = conversions.cmyk;
var conversions_6 = conversions.xyz;
var conversions_7 = conversions.lab;
var conversions_8 = conversions.lch;
var conversions_9 = conversions.hex;
var conversions_10 = conversions.keyword;
var conversions_11 = conversions.ansi16;
var conversions_12 = conversions.ansi256;
var conversions_13 = conversions.hcg;
var conversions_14 = conversions.apple;
var conversions_15 = conversions.gray;

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path$$1 = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path$$1.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path$$1;
	return fn;
}

var route = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

var colorConvert = convert;

'use strict';




var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(colorConvert).forEach(function (model) {
	hashedModelKeys[_slice.call(colorConvert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in colorConvert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (!obj) {
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = colorConvert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = colorConvert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = colorConvert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = colorConvert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = colorConvert[this.model].channels;
		var labels = colorConvert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorConvert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(colorConvert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = colorConvert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(colorConvert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

var color = Color;

'use strict';

/***
 * Convert string to hex color.
 *
 * @param {String} str Text to hash and convert to hex.
 * @returns {String}
 * @api public
 */
var textHex = function hex(str) {
  for (
    var i = 0, hash = 0;
    i < str.length;
    hash = str.charCodeAt(i++) + ((hash << 5) - hash)
  );

  var color = Math.floor(
    Math.abs(
      (Math.sin(hash) * 10000) % 1 * 16777216
    )
  ).toString(16);

  return '#' + Array(6 - color.length + 1).join('0') + color;
};

'use strict';



/**
 * Generate a color for a given name. But be reasonably smart about it by
 * understanding name spaces and coloring each namespace a bit lighter so they
 * still have the same base color as the root.
 *
 * @param {String} name The namespace
 * @returns {String} color
 * @api private
 */
var colorspace = function colorspace(namespace, delimiter) {
  var split = namespace.split(delimiter || ':');
  var base = textHex(split[0]);

  if (!split.length) return base;

  for (var i = 0, l = split.length - 1; i < l; i++) {
    base = color(base)
    .mix(color(textHex(split[i + 1])))
    .saturate(1)
    .hex();
  }

  return base;
};

'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Gather environment variables from various locations.
 *
 * @param {Object} environment The default environment variables.
 * @returns {Object} environment.
 * @api public
 */
function env$1(environment) {
  environment = environment || {};

  if ('object' === typeof process && 'object' === typeof process.env) {
    env$1.merge(environment, process.env);
  }

  if ('undefined' !== typeof window) {
    if ('string' === window.name && window.name.length) {
      env$1.merge(environment, env$1.parse(window.name));
    }

    if (window.localStorage) {
      try { env$1.merge(environment, env$1.parse(window.localStorage.env || window.localStorage.debug)); }
      catch (e) {}
    }

    if (
         'object' === typeof window.location
      && 'string' === typeof window.location.hash
      && window.location.hash.length
    ) {
      env$1.merge(environment, env$1.parse(window.location.hash.charAt(0) === '#'
        ? window.location.hash.slice(1)
        : window.location.hash
      ));
    }
  }

  //
  // Also add lower case variants to the object for easy access.
  //
  var key, lower;
  for (key in environment) {
    lower = key.toLowerCase();

    if (!(lower in environment)) {
      environment[lower] = environment[key];
    }
  }

  return environment;
}

/**
 * A poor man's merge utility.
 *
 * @param {Object} base Object where the add object is merged in.
 * @param {Object} add Object that needs to be added to the base object.
 * @returns {Object} base
 * @api private
 */
env$1.merge = function merge(base, add) {
  for (var key in add) {
    if (has.call(add, key)) {
      base[key] = add[key];
    }
  }

  return base;
};

/**
 * A poor man's query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object} Key value mapped query string.
 * @api private
 */
env$1.parse = function parse(query) {
  var parser = /([^=?&]+)=([^&]*)/g
    , result = {}
    , part;

  if (!query) return result;

  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result.env || result;
};

//
// Expose the module
//
var envVariable = env$1;

'use strict';



/**
 * Checks if a given namespace is allowed by the environment variables.
 *
 * @param {String} name namespace that should be included.
 * @param {Array} variables
 * @returns {Boolean}
 * @api public
 */
var enabled = function enabled(name, variables) {
  var envy = envVariable()
    , variable
    , i = 0;

  variables = variables || ['diagnostics', 'debug'];

  for (; i < variables.length; i++) {
    if ((variable = envy[variables[i]])) break;
  }

  if (!variable) return false;

  variables = variable.split(/[\s,]+/);
  i = 0;

  for (; i < variables.length; i++) {
    variable = variables[i].replace('*', '.*?');

    if ('-' === variable.charAt(0)) {
      if ((new RegExp('^'+ variable.substr(1) +'$')).test(name)) {
        return false;
      }

      continue;
    }

    if ((new RegExp('^'+ variable +'$')).test(name)) {
      return true;
    }
  }

  return false;
};

var colors$3 = [
  {
    "value":"#B0171F",
    "name":"indian red"
  },
  {
    "value":"#DC143C",
    "css":true,
    "name":"crimson"
  },
  {
    "value":"#FFB6C1",
    "css":true,
    "name":"lightpink"
  },
  {
    "value":"#FFAEB9",
    "name":"lightpink 1"
  },
  {
    "value":"#EEA2AD",
    "name":"lightpink 2"
  },
  {
    "value":"#CD8C95",
    "name":"lightpink 3"
  },
  {
    "value":"#8B5F65",
    "name":"lightpink 4"
  },
  {
    "value":"#FFC0CB",
    "css":true,
    "name":"pink"
  },
  {
    "value":"#FFB5C5",
    "name":"pink 1"
  },
  {
    "value":"#EEA9B8",
    "name":"pink 2"
  },
  {
    "value":"#CD919E",
    "name":"pink 3"
  },
  {
    "value":"#8B636C",
    "name":"pink 4"
  },
  {
    "value":"#DB7093",
    "css":true,
    "name":"palevioletred"
  },
  {
    "value":"#FF82AB",
    "name":"palevioletred 1"
  },
  {
    "value":"#EE799F",
    "name":"palevioletred 2"
  },
  {
    "value":"#CD6889",
    "name":"palevioletred 3"
  },
  {
    "value":"#8B475D",
    "name":"palevioletred 4"
  },
  {
    "value":"#FFF0F5",
    "name":"lavenderblush 1"
  },
  {
    "value":"#FFF0F5",
    "css":true,
    "name":"lavenderblush"
  },
  {
    "value":"#EEE0E5",
    "name":"lavenderblush 2"
  },
  {
    "value":"#CDC1C5",
    "name":"lavenderblush 3"
  },
  {
    "value":"#8B8386",
    "name":"lavenderblush 4"
  },
  {
    "value":"#FF3E96",
    "name":"violetred 1"
  },
  {
    "value":"#EE3A8C",
    "name":"violetred 2"
  },
  {
    "value":"#CD3278",
    "name":"violetred 3"
  },
  {
    "value":"#8B2252",
    "name":"violetred 4"
  },
  {
    "value":"#FF69B4",
    "css":true,
    "name":"hotpink"
  },
  {
    "value":"#FF6EB4",
    "name":"hotpink 1"
  },
  {
    "value":"#EE6AA7",
    "name":"hotpink 2"
  },
  {
    "value":"#CD6090",
    "name":"hotpink 3"
  },
  {
    "value":"#8B3A62",
    "name":"hotpink 4"
  },
  {
    "value":"#872657",
    "name":"raspberry"
  },
  {
    "value":"#FF1493",
    "name":"deeppink 1"
  },
  {
    "value":"#FF1493",
    "css":true,
    "name":"deeppink"
  },
  {
    "value":"#EE1289",
    "name":"deeppink 2"
  },
  {
    "value":"#CD1076",
    "name":"deeppink 3"
  },
  {
    "value":"#8B0A50",
    "name":"deeppink 4"
  },
  {
    "value":"#FF34B3",
    "name":"maroon 1"
  },
  {
    "value":"#EE30A7",
    "name":"maroon 2"
  },
  {
    "value":"#CD2990",
    "name":"maroon 3"
  },
  {
    "value":"#8B1C62",
    "name":"maroon 4"
  },
  {
    "value":"#C71585",
    "css":true,
    "name":"mediumvioletred"
  },
  {
    "value":"#D02090",
    "name":"violetred"
  },
  {
    "value":"#DA70D6",
    "css":true,
    "name":"orchid"
  },
  {
    "value":"#FF83FA",
    "name":"orchid 1"
  },
  {
    "value":"#EE7AE9",
    "name":"orchid 2"
  },
  {
    "value":"#CD69C9",
    "name":"orchid 3"
  },
  {
    "value":"#8B4789",
    "name":"orchid 4"
  },
  {
    "value":"#D8BFD8",
    "css":true,
    "name":"thistle"
  },
  {
    "value":"#FFE1FF",
    "name":"thistle 1"
  },
  {
    "value":"#EED2EE",
    "name":"thistle 2"
  },
  {
    "value":"#CDB5CD",
    "name":"thistle 3"
  },
  {
    "value":"#8B7B8B",
    "name":"thistle 4"
  },
  {
    "value":"#FFBBFF",
    "name":"plum 1"
  },
  {
    "value":"#EEAEEE",
    "name":"plum 2"
  },
  {
    "value":"#CD96CD",
    "name":"plum 3"
  },
  {
    "value":"#8B668B",
    "name":"plum 4"
  },
  {
    "value":"#DDA0DD",
    "css":true,
    "name":"plum"
  },
  {
    "value":"#EE82EE",
    "css":true,
    "name":"violet"
  },
  {
    "value":"#FF00FF",
    "vga":true,
    "name":"magenta"
  },
  {
    "value":"#FF00FF",
    "vga":true,
    "css":true,
    "name":"fuchsia"
  },
  {
    "value":"#EE00EE",
    "name":"magenta 2"
  },
  {
    "value":"#CD00CD",
    "name":"magenta 3"
  },
  {
    "value":"#8B008B",
    "name":"magenta 4"
  },
  {
    "value":"#8B008B",
    "css":true,
    "name":"darkmagenta"
  },
  {
    "value":"#800080",
    "vga":true,
    "css":true,
    "name":"purple"
  },
  {
    "value":"#BA55D3",
    "css":true,
    "name":"mediumorchid"
  },
  {
    "value":"#E066FF",
    "name":"mediumorchid 1"
  },
  {
    "value":"#D15FEE",
    "name":"mediumorchid 2"
  },
  {
    "value":"#B452CD",
    "name":"mediumorchid 3"
  },
  {
    "value":"#7A378B",
    "name":"mediumorchid 4"
  },
  {
    "value":"#9400D3",
    "css":true,
    "name":"darkviolet"
  },
  {
    "value":"#9932CC",
    "css":true,
    "name":"darkorchid"
  },
  {
    "value":"#BF3EFF",
    "name":"darkorchid 1"
  },
  {
    "value":"#B23AEE",
    "name":"darkorchid 2"
  },
  {
    "value":"#9A32CD",
    "name":"darkorchid 3"
  },
  {
    "value":"#68228B",
    "name":"darkorchid 4"
  },
  {
    "value":"#4B0082",
    "css":true,
    "name":"indigo"
  },
  {
    "value":"#8A2BE2",
    "css":true,
    "name":"blueviolet"
  },
  {
    "value":"#9B30FF",
    "name":"purple 1"
  },
  {
    "value":"#912CEE",
    "name":"purple 2"
  },
  {
    "value":"#7D26CD",
    "name":"purple 3"
  },
  {
    "value":"#551A8B",
    "name":"purple 4"
  },
  {
    "value":"#9370DB",
    "css":true,
    "name":"mediumpurple"
  },
  {
    "value":"#AB82FF",
    "name":"mediumpurple 1"
  },
  {
    "value":"#9F79EE",
    "name":"mediumpurple 2"
  },
  {
    "value":"#8968CD",
    "name":"mediumpurple 3"
  },
  {
    "value":"#5D478B",
    "name":"mediumpurple 4"
  },
  {
    "value":"#483D8B",
    "css":true,
    "name":"darkslateblue"
  },
  {
    "value":"#8470FF",
    "name":"lightslateblue"
  },
  {
    "value":"#7B68EE",
    "css":true,
    "name":"mediumslateblue"
  },
  {
    "value":"#6A5ACD",
    "css":true,
    "name":"slateblue"
  },
  {
    "value":"#836FFF",
    "name":"slateblue 1"
  },
  {
    "value":"#7A67EE",
    "name":"slateblue 2"
  },
  {
    "value":"#6959CD",
    "name":"slateblue 3"
  },
  {
    "value":"#473C8B",
    "name":"slateblue 4"
  },
  {
    "value":"#F8F8FF",
    "css":true,
    "name":"ghostwhite"
  },
  {
    "value":"#E6E6FA",
    "css":true,
    "name":"lavender"
  },
  {
    "value":"#0000FF",
    "vga":true,
    "css":true,
    "name":"blue"
  },
  {
    "value":"#0000EE",
    "name":"blue 2"
  },
  {
    "value":"#0000CD",
    "name":"blue 3"
  },
  {
    "value":"#0000CD",
    "css":true,
    "name":"mediumblue"
  },
  {
    "value":"#00008B",
    "name":"blue 4"
  },
  {
    "value":"#00008B",
    "css":true,
    "name":"darkblue"
  },
  {
    "value":"#000080",
    "vga":true,
    "css":true,
    "name":"navy"
  },
  {
    "value":"#191970",
    "css":true,
    "name":"midnightblue"
  },
  {
    "value":"#3D59AB",
    "name":"cobalt"
  },
  {
    "value":"#4169E1",
    "css":true,
    "name":"royalblue"
  },
  {
    "value":"#4876FF",
    "name":"royalblue 1"
  },
  {
    "value":"#436EEE",
    "name":"royalblue 2"
  },
  {
    "value":"#3A5FCD",
    "name":"royalblue 3"
  },
  {
    "value":"#27408B",
    "name":"royalblue 4"
  },
  {
    "value":"#6495ED",
    "css":true,
    "name":"cornflowerblue"
  },
  {
    "value":"#B0C4DE",
    "css":true,
    "name":"lightsteelblue"
  },
  {
    "value":"#CAE1FF",
    "name":"lightsteelblue 1"
  },
  {
    "value":"#BCD2EE",
    "name":"lightsteelblue 2"
  },
  {
    "value":"#A2B5CD",
    "name":"lightsteelblue 3"
  },
  {
    "value":"#6E7B8B",
    "name":"lightsteelblue 4"
  },
  {
    "value":"#778899",
    "css":true,
    "name":"lightslategray"
  },
  {
    "value":"#708090",
    "css":true,
    "name":"slategray"
  },
  {
    "value":"#C6E2FF",
    "name":"slategray 1"
  },
  {
    "value":"#B9D3EE",
    "name":"slategray 2"
  },
  {
    "value":"#9FB6CD",
    "name":"slategray 3"
  },
  {
    "value":"#6C7B8B",
    "name":"slategray 4"
  },
  {
    "value":"#1E90FF",
    "name":"dodgerblue 1"
  },
  {
    "value":"#1E90FF",
    "css":true,
    "name":"dodgerblue"
  },
  {
    "value":"#1C86EE",
    "name":"dodgerblue 2"
  },
  {
    "value":"#1874CD",
    "name":"dodgerblue 3"
  },
  {
    "value":"#104E8B",
    "name":"dodgerblue 4"
  },
  {
    "value":"#F0F8FF",
    "css":true,
    "name":"aliceblue"
  },
  {
    "value":"#4682B4",
    "css":true,
    "name":"steelblue"
  },
  {
    "value":"#63B8FF",
    "name":"steelblue 1"
  },
  {
    "value":"#5CACEE",
    "name":"steelblue 2"
  },
  {
    "value":"#4F94CD",
    "name":"steelblue 3"
  },
  {
    "value":"#36648B",
    "name":"steelblue 4"
  },
  {
    "value":"#87CEFA",
    "css":true,
    "name":"lightskyblue"
  },
  {
    "value":"#B0E2FF",
    "name":"lightskyblue 1"
  },
  {
    "value":"#A4D3EE",
    "name":"lightskyblue 2"
  },
  {
    "value":"#8DB6CD",
    "name":"lightskyblue 3"
  },
  {
    "value":"#607B8B",
    "name":"lightskyblue 4"
  },
  {
    "value":"#87CEFF",
    "name":"skyblue 1"
  },
  {
    "value":"#7EC0EE",
    "name":"skyblue 2"
  },
  {
    "value":"#6CA6CD",
    "name":"skyblue 3"
  },
  {
    "value":"#4A708B",
    "name":"skyblue 4"
  },
  {
    "value":"#87CEEB",
    "css":true,
    "name":"skyblue"
  },
  {
    "value":"#00BFFF",
    "name":"deepskyblue 1"
  },
  {
    "value":"#00BFFF",
    "css":true,
    "name":"deepskyblue"
  },
  {
    "value":"#00B2EE",
    "name":"deepskyblue 2"
  },
  {
    "value":"#009ACD",
    "name":"deepskyblue 3"
  },
  {
    "value":"#00688B",
    "name":"deepskyblue 4"
  },
  {
    "value":"#33A1C9",
    "name":"peacock"
  },
  {
    "value":"#ADD8E6",
    "css":true,
    "name":"lightblue"
  },
  {
    "value":"#BFEFFF",
    "name":"lightblue 1"
  },
  {
    "value":"#B2DFEE",
    "name":"lightblue 2"
  },
  {
    "value":"#9AC0CD",
    "name":"lightblue 3"
  },
  {
    "value":"#68838B",
    "name":"lightblue 4"
  },
  {
    "value":"#B0E0E6",
    "css":true,
    "name":"powderblue"
  },
  {
    "value":"#98F5FF",
    "name":"cadetblue 1"
  },
  {
    "value":"#8EE5EE",
    "name":"cadetblue 2"
  },
  {
    "value":"#7AC5CD",
    "name":"cadetblue 3"
  },
  {
    "value":"#53868B",
    "name":"cadetblue 4"
  },
  {
    "value":"#00F5FF",
    "name":"turquoise 1"
  },
  {
    "value":"#00E5EE",
    "name":"turquoise 2"
  },
  {
    "value":"#00C5CD",
    "name":"turquoise 3"
  },
  {
    "value":"#00868B",
    "name":"turquoise 4"
  },
  {
    "value":"#5F9EA0",
    "css":true,
    "name":"cadetblue"
  },
  {
    "value":"#00CED1",
    "css":true,
    "name":"darkturquoise"
  },
  {
    "value":"#F0FFFF",
    "name":"azure 1"
  },
  {
    "value":"#F0FFFF",
    "css":true,
    "name":"azure"
  },
  {
    "value":"#E0EEEE",
    "name":"azure 2"
  },
  {
    "value":"#C1CDCD",
    "name":"azure 3"
  },
  {
    "value":"#838B8B",
    "name":"azure 4"
  },
  {
    "value":"#E0FFFF",
    "name":"lightcyan 1"
  },
  {
    "value":"#E0FFFF",
    "css":true,
    "name":"lightcyan"
  },
  {
    "value":"#D1EEEE",
    "name":"lightcyan 2"
  },
  {
    "value":"#B4CDCD",
    "name":"lightcyan 3"
  },
  {
    "value":"#7A8B8B",
    "name":"lightcyan 4"
  },
  {
    "value":"#BBFFFF",
    "name":"paleturquoise 1"
  },
  {
    "value":"#AEEEEE",
    "name":"paleturquoise 2"
  },
  {
    "value":"#AEEEEE",
    "css":true,
    "name":"paleturquoise"
  },
  {
    "value":"#96CDCD",
    "name":"paleturquoise 3"
  },
  {
    "value":"#668B8B",
    "name":"paleturquoise 4"
  },
  {
    "value":"#2F4F4F",
    "css":true,
    "name":"darkslategray"
  },
  {
    "value":"#97FFFF",
    "name":"darkslategray 1"
  },
  {
    "value":"#8DEEEE",
    "name":"darkslategray 2"
  },
  {
    "value":"#79CDCD",
    "name":"darkslategray 3"
  },
  {
    "value":"#528B8B",
    "name":"darkslategray 4"
  },
  {
    "value":"#00FFFF",
    "name":"cyan"
  },
  {
    "value":"#00FFFF",
    "css":true,
    "name":"aqua"
  },
  {
    "value":"#00EEEE",
    "name":"cyan 2"
  },
  {
    "value":"#00CDCD",
    "name":"cyan 3"
  },
  {
    "value":"#008B8B",
    "name":"cyan 4"
  },
  {
    "value":"#008B8B",
    "css":true,
    "name":"darkcyan"
  },
  {
    "value":"#008080",
    "vga":true,
    "css":true,
    "name":"teal"
  },
  {
    "value":"#48D1CC",
    "css":true,
    "name":"mediumturquoise"
  },
  {
    "value":"#20B2AA",
    "css":true,
    "name":"lightseagreen"
  },
  {
    "value":"#03A89E",
    "name":"manganeseblue"
  },
  {
    "value":"#40E0D0",
    "css":true,
    "name":"turquoise"
  },
  {
    "value":"#808A87",
    "name":"coldgrey"
  },
  {
    "value":"#00C78C",
    "name":"turquoiseblue"
  },
  {
    "value":"#7FFFD4",
    "name":"aquamarine 1"
  },
  {
    "value":"#7FFFD4",
    "css":true,
    "name":"aquamarine"
  },
  {
    "value":"#76EEC6",
    "name":"aquamarine 2"
  },
  {
    "value":"#66CDAA",
    "name":"aquamarine 3"
  },
  {
    "value":"#66CDAA",
    "css":true,
    "name":"mediumaquamarine"
  },
  {
    "value":"#458B74",
    "name":"aquamarine 4"
  },
  {
    "value":"#00FA9A",
    "css":true,
    "name":"mediumspringgreen"
  },
  {
    "value":"#F5FFFA",
    "css":true,
    "name":"mintcream"
  },
  {
    "value":"#00FF7F",
    "css":true,
    "name":"springgreen"
  },
  {
    "value":"#00EE76",
    "name":"springgreen 1"
  },
  {
    "value":"#00CD66",
    "name":"springgreen 2"
  },
  {
    "value":"#008B45",
    "name":"springgreen 3"
  },
  {
    "value":"#3CB371",
    "css":true,
    "name":"mediumseagreen"
  },
  {
    "value":"#54FF9F",
    "name":"seagreen 1"
  },
  {
    "value":"#4EEE94",
    "name":"seagreen 2"
  },
  {
    "value":"#43CD80",
    "name":"seagreen 3"
  },
  {
    "value":"#2E8B57",
    "name":"seagreen 4"
  },
  {
    "value":"#2E8B57",
    "css":true,
    "name":"seagreen"
  },
  {
    "value":"#00C957",
    "name":"emeraldgreen"
  },
  {
    "value":"#BDFCC9",
    "name":"mint"
  },
  {
    "value":"#3D9140",
    "name":"cobaltgreen"
  },
  {
    "value":"#F0FFF0",
    "name":"honeydew 1"
  },
  {
    "value":"#F0FFF0",
    "css":true,
    "name":"honeydew"
  },
  {
    "value":"#E0EEE0",
    "name":"honeydew 2"
  },
  {
    "value":"#C1CDC1",
    "name":"honeydew 3"
  },
  {
    "value":"#838B83",
    "name":"honeydew 4"
  },
  {
    "value":"#8FBC8F",
    "css":true,
    "name":"darkseagreen"
  },
  {
    "value":"#C1FFC1",
    "name":"darkseagreen 1"
  },
  {
    "value":"#B4EEB4",
    "name":"darkseagreen 2"
  },
  {
    "value":"#9BCD9B",
    "name":"darkseagreen 3"
  },
  {
    "value":"#698B69",
    "name":"darkseagreen 4"
  },
  {
    "value":"#98FB98",
    "css":true,
    "name":"palegreen"
  },
  {
    "value":"#9AFF9A",
    "name":"palegreen 1"
  },
  {
    "value":"#90EE90",
    "name":"palegreen 2"
  },
  {
    "value":"#90EE90",
    "css":true,
    "name":"lightgreen"
  },
  {
    "value":"#7CCD7C",
    "name":"palegreen 3"
  },
  {
    "value":"#548B54",
    "name":"palegreen 4"
  },
  {
    "value":"#32CD32",
    "css":true,
    "name":"limegreen"
  },
  {
    "value":"#228B22",
    "css":true,
    "name":"forestgreen"
  },
  {
    "value":"#00FF00",
    "vga":true,
    "name":"green 1"
  },
  {
    "value":"#00FF00",
    "vga":true,
    "css":true,
    "name":"lime"
  },
  {
    "value":"#00EE00",
    "name":"green 2"
  },
  {
    "value":"#00CD00",
    "name":"green 3"
  },
  {
    "value":"#008B00",
    "name":"green 4"
  },
  {
    "value":"#008000",
    "vga":true,
    "css":true,
    "name":"green"
  },
  {
    "value":"#006400",
    "css":true,
    "name":"darkgreen"
  },
  {
    "value":"#308014",
    "name":"sapgreen"
  },
  {
    "value":"#7CFC00",
    "css":true,
    "name":"lawngreen"
  },
  {
    "value":"#7FFF00",
    "name":"chartreuse 1"
  },
  {
    "value":"#7FFF00",
    "css":true,
    "name":"chartreuse"
  },
  {
    "value":"#76EE00",
    "name":"chartreuse 2"
  },
  {
    "value":"#66CD00",
    "name":"chartreuse 3"
  },
  {
    "value":"#458B00",
    "name":"chartreuse 4"
  },
  {
    "value":"#ADFF2F",
    "css":true,
    "name":"greenyellow"
  },
  {
    "value":"#CAFF70",
    "name":"darkolivegreen 1"
  },
  {
    "value":"#BCEE68",
    "name":"darkolivegreen 2"
  },
  {
    "value":"#A2CD5A",
    "name":"darkolivegreen 3"
  },
  {
    "value":"#6E8B3D",
    "name":"darkolivegreen 4"
  },
  {
    "value":"#556B2F",
    "css":true,
    "name":"darkolivegreen"
  },
  {
    "value":"#6B8E23",
    "css":true,
    "name":"olivedrab"
  },
  {
    "value":"#C0FF3E",
    "name":"olivedrab 1"
  },
  {
    "value":"#B3EE3A",
    "name":"olivedrab 2"
  },
  {
    "value":"#9ACD32",
    "name":"olivedrab 3"
  },
  {
    "value":"#9ACD32",
    "css":true,
    "name":"yellowgreen"
  },
  {
    "value":"#698B22",
    "name":"olivedrab 4"
  },
  {
    "value":"#FFFFF0",
    "name":"ivory 1"
  },
  {
    "value":"#FFFFF0",
    "css":true,
    "name":"ivory"
  },
  {
    "value":"#EEEEE0",
    "name":"ivory 2"
  },
  {
    "value":"#CDCDC1",
    "name":"ivory 3"
  },
  {
    "value":"#8B8B83",
    "name":"ivory 4"
  },
  {
    "value":"#F5F5DC",
    "css":true,
    "name":"beige"
  },
  {
    "value":"#FFFFE0",
    "name":"lightyellow 1"
  },
  {
    "value":"#FFFFE0",
    "css":true,
    "name":"lightyellow"
  },
  {
    "value":"#EEEED1",
    "name":"lightyellow 2"
  },
  {
    "value":"#CDCDB4",
    "name":"lightyellow 3"
  },
  {
    "value":"#8B8B7A",
    "name":"lightyellow 4"
  },
  {
    "value":"#FAFAD2",
    "css":true,
    "name":"lightgoldenrodyellow"
  },
  {
    "value":"#FFFF00",
    "vga":true,
    "name":"yellow 1"
  },
  {
    "value":"#FFFF00",
    "vga":true,
    "css":true,
    "name":"yellow"
  },
  {
    "value":"#EEEE00",
    "name":"yellow 2"
  },
  {
    "value":"#CDCD00",
    "name":"yellow 3"
  },
  {
    "value":"#8B8B00",
    "name":"yellow 4"
  },
  {
    "value":"#808069",
    "name":"warmgrey"
  },
  {
    "value":"#808000",
    "vga":true,
    "css":true,
    "name":"olive"
  },
  {
    "value":"#BDB76B",
    "css":true,
    "name":"darkkhaki"
  },
  {
    "value":"#FFF68F",
    "name":"khaki 1"
  },
  {
    "value":"#EEE685",
    "name":"khaki 2"
  },
  {
    "value":"#CDC673",
    "name":"khaki 3"
  },
  {
    "value":"#8B864E",
    "name":"khaki 4"
  },
  {
    "value":"#F0E68C",
    "css":true,
    "name":"khaki"
  },
  {
    "value":"#EEE8AA",
    "css":true,
    "name":"palegoldenrod"
  },
  {
    "value":"#FFFACD",
    "name":"lemonchiffon 1"
  },
  {
    "value":"#FFFACD",
    "css":true,
    "name":"lemonchiffon"
  },
  {
    "value":"#EEE9BF",
    "name":"lemonchiffon 2"
  },
  {
    "value":"#CDC9A5",
    "name":"lemonchiffon 3"
  },
  {
    "value":"#8B8970",
    "name":"lemonchiffon 4"
  },
  {
    "value":"#FFEC8B",
    "name":"lightgoldenrod 1"
  },
  {
    "value":"#EEDC82",
    "name":"lightgoldenrod 2"
  },
  {
    "value":"#CDBE70",
    "name":"lightgoldenrod 3"
  },
  {
    "value":"#8B814C",
    "name":"lightgoldenrod 4"
  },
  {
    "value":"#E3CF57",
    "name":"banana"
  },
  {
    "value":"#FFD700",
    "name":"gold 1"
  },
  {
    "value":"#FFD700",
    "css":true,
    "name":"gold"
  },
  {
    "value":"#EEC900",
    "name":"gold 2"
  },
  {
    "value":"#CDAD00",
    "name":"gold 3"
  },
  {
    "value":"#8B7500",
    "name":"gold 4"
  },
  {
    "value":"#FFF8DC",
    "name":"cornsilk 1"
  },
  {
    "value":"#FFF8DC",
    "css":true,
    "name":"cornsilk"
  },
  {
    "value":"#EEE8CD",
    "name":"cornsilk 2"
  },
  {
    "value":"#CDC8B1",
    "name":"cornsilk 3"
  },
  {
    "value":"#8B8878",
    "name":"cornsilk 4"
  },
  {
    "value":"#DAA520",
    "css":true,
    "name":"goldenrod"
  },
  {
    "value":"#FFC125",
    "name":"goldenrod 1"
  },
  {
    "value":"#EEB422",
    "name":"goldenrod 2"
  },
  {
    "value":"#CD9B1D",
    "name":"goldenrod 3"
  },
  {
    "value":"#8B6914",
    "name":"goldenrod 4"
  },
  {
    "value":"#B8860B",
    "css":true,
    "name":"darkgoldenrod"
  },
  {
    "value":"#FFB90F",
    "name":"darkgoldenrod 1"
  },
  {
    "value":"#EEAD0E",
    "name":"darkgoldenrod 2"
  },
  {
    "value":"#CD950C",
    "name":"darkgoldenrod 3"
  },
  {
    "value":"#8B6508",
    "name":"darkgoldenrod 4"
  },
  {
    "value":"#FFA500",
    "name":"orange 1"
  },
  {
    "value":"#FF8000",
    "css":true,
    "name":"orange"
  },
  {
    "value":"#EE9A00",
    "name":"orange 2"
  },
  {
    "value":"#CD8500",
    "name":"orange 3"
  },
  {
    "value":"#8B5A00",
    "name":"orange 4"
  },
  {
    "value":"#FFFAF0",
    "css":true,
    "name":"floralwhite"
  },
  {
    "value":"#FDF5E6",
    "css":true,
    "name":"oldlace"
  },
  {
    "value":"#F5DEB3",
    "css":true,
    "name":"wheat"
  },
  {
    "value":"#FFE7BA",
    "name":"wheat 1"
  },
  {
    "value":"#EED8AE",
    "name":"wheat 2"
  },
  {
    "value":"#CDBA96",
    "name":"wheat 3"
  },
  {
    "value":"#8B7E66",
    "name":"wheat 4"
  },
  {
    "value":"#FFE4B5",
    "css":true,
    "name":"moccasin"
  },
  {
    "value":"#FFEFD5",
    "css":true,
    "name":"papayawhip"
  },
  {
    "value":"#FFEBCD",
    "css":true,
    "name":"blanchedalmond"
  },
  {
    "value":"#FFDEAD",
    "name":"navajowhite 1"
  },
  {
    "value":"#FFDEAD",
    "css":true,
    "name":"navajowhite"
  },
  {
    "value":"#EECFA1",
    "name":"navajowhite 2"
  },
  {
    "value":"#CDB38B",
    "name":"navajowhite 3"
  },
  {
    "value":"#8B795E",
    "name":"navajowhite 4"
  },
  {
    "value":"#FCE6C9",
    "name":"eggshell"
  },
  {
    "value":"#D2B48C",
    "css":true,
    "name":"tan"
  },
  {
    "value":"#9C661F",
    "name":"brick"
  },
  {
    "value":"#FF9912",
    "name":"cadmiumyellow"
  },
  {
    "value":"#FAEBD7",
    "css":true,
    "name":"antiquewhite"
  },
  {
    "value":"#FFEFDB",
    "name":"antiquewhite 1"
  },
  {
    "value":"#EEDFCC",
    "name":"antiquewhite 2"
  },
  {
    "value":"#CDC0B0",
    "name":"antiquewhite 3"
  },
  {
    "value":"#8B8378",
    "name":"antiquewhite 4"
  },
  {
    "value":"#DEB887",
    "css":true,
    "name":"burlywood"
  },
  {
    "value":"#FFD39B",
    "name":"burlywood 1"
  },
  {
    "value":"#EEC591",
    "name":"burlywood 2"
  },
  {
    "value":"#CDAA7D",
    "name":"burlywood 3"
  },
  {
    "value":"#8B7355",
    "name":"burlywood 4"
  },
  {
    "value":"#FFE4C4",
    "name":"bisque 1"
  },
  {
    "value":"#FFE4C4",
    "css":true,
    "name":"bisque"
  },
  {
    "value":"#EED5B7",
    "name":"bisque 2"
  },
  {
    "value":"#CDB79E",
    "name":"bisque 3"
  },
  {
    "value":"#8B7D6B",
    "name":"bisque 4"
  },
  {
    "value":"#E3A869",
    "name":"melon"
  },
  {
    "value":"#ED9121",
    "name":"carrot"
  },
  {
    "value":"#FF8C00",
    "css":true,
    "name":"darkorange"
  },
  {
    "value":"#FF7F00",
    "name":"darkorange 1"
  },
  {
    "value":"#EE7600",
    "name":"darkorange 2"
  },
  {
    "value":"#CD6600",
    "name":"darkorange 3"
  },
  {
    "value":"#8B4500",
    "name":"darkorange 4"
  },
  {
    "value":"#FFA54F",
    "name":"tan 1"
  },
  {
    "value":"#EE9A49",
    "name":"tan 2"
  },
  {
    "value":"#CD853F",
    "name":"tan 3"
  },
  {
    "value":"#CD853F",
    "css":true,
    "name":"peru"
  },
  {
    "value":"#8B5A2B",
    "name":"tan 4"
  },
  {
    "value":"#FAF0E6",
    "css":true,
    "name":"linen"
  },
  {
    "value":"#FFDAB9",
    "name":"peachpuff 1"
  },
  {
    "value":"#FFDAB9",
    "css":true,
    "name":"peachpuff"
  },
  {
    "value":"#EECBAD",
    "name":"peachpuff 2"
  },
  {
    "value":"#CDAF95",
    "name":"peachpuff 3"
  },
  {
    "value":"#8B7765",
    "name":"peachpuff 4"
  },
  {
    "value":"#FFF5EE",
    "name":"seashell 1"
  },
  {
    "value":"#FFF5EE",
    "css":true,
    "name":"seashell"
  },
  {
    "value":"#EEE5DE",
    "name":"seashell 2"
  },
  {
    "value":"#CDC5BF",
    "name":"seashell 3"
  },
  {
    "value":"#8B8682",
    "name":"seashell 4"
  },
  {
    "value":"#F4A460",
    "css":true,
    "name":"sandybrown"
  },
  {
    "value":"#C76114",
    "name":"rawsienna"
  },
  {
    "value":"#D2691E",
    "css":true,
    "name":"chocolate"
  },
  {
    "value":"#FF7F24",
    "name":"chocolate 1"
  },
  {
    "value":"#EE7621",
    "name":"chocolate 2"
  },
  {
    "value":"#CD661D",
    "name":"chocolate 3"
  },
  {
    "value":"#8B4513",
    "name":"chocolate 4"
  },
  {
    "value":"#8B4513",
    "css":true,
    "name":"saddlebrown"
  },
  {
    "value":"#292421",
    "name":"ivoryblack"
  },
  {
    "value":"#FF7D40",
    "name":"flesh"
  },
  {
    "value":"#FF6103",
    "name":"cadmiumorange"
  },
  {
    "value":"#8A360F",
    "name":"burntsienna"
  },
  {
    "value":"#A0522D",
    "css":true,
    "name":"sienna"
  },
  {
    "value":"#FF8247",
    "name":"sienna 1"
  },
  {
    "value":"#EE7942",
    "name":"sienna 2"
  },
  {
    "value":"#CD6839",
    "name":"sienna 3"
  },
  {
    "value":"#8B4726",
    "name":"sienna 4"
  },
  {
    "value":"#FFA07A",
    "name":"lightsalmon 1"
  },
  {
    "value":"#FFA07A",
    "css":true,
    "name":"lightsalmon"
  },
  {
    "value":"#EE9572",
    "name":"lightsalmon 2"
  },
  {
    "value":"#CD8162",
    "name":"lightsalmon 3"
  },
  {
    "value":"#8B5742",
    "name":"lightsalmon 4"
  },
  {
    "value":"#FF7F50",
    "css":true,
    "name":"coral"
  },
  {
    "value":"#FF4500",
    "name":"orangered 1"
  },
  {
    "value":"#FF4500",
    "css":true,
    "name":"orangered"
  },
  {
    "value":"#EE4000",
    "name":"orangered 2"
  },
  {
    "value":"#CD3700",
    "name":"orangered 3"
  },
  {
    "value":"#8B2500",
    "name":"orangered 4"
  },
  {
    "value":"#5E2612",
    "name":"sepia"
  },
  {
    "value":"#E9967A",
    "css":true,
    "name":"darksalmon"
  },
  {
    "value":"#FF8C69",
    "name":"salmon 1"
  },
  {
    "value":"#EE8262",
    "name":"salmon 2"
  },
  {
    "value":"#CD7054",
    "name":"salmon 3"
  },
  {
    "value":"#8B4C39",
    "name":"salmon 4"
  },
  {
    "value":"#FF7256",
    "name":"coral 1"
  },
  {
    "value":"#EE6A50",
    "name":"coral 2"
  },
  {
    "value":"#CD5B45",
    "name":"coral 3"
  },
  {
    "value":"#8B3E2F",
    "name":"coral 4"
  },
  {
    "value":"#8A3324",
    "name":"burntumber"
  },
  {
    "value":"#FF6347",
    "name":"tomato 1"
  },
  {
    "value":"#FF6347",
    "css":true,
    "name":"tomato"
  },
  {
    "value":"#EE5C42",
    "name":"tomato 2"
  },
  {
    "value":"#CD4F39",
    "name":"tomato 3"
  },
  {
    "value":"#8B3626",
    "name":"tomato 4"
  },
  {
    "value":"#FA8072",
    "css":true,
    "name":"salmon"
  },
  {
    "value":"#FFE4E1",
    "name":"mistyrose 1"
  },
  {
    "value":"#FFE4E1",
    "css":true,
    "name":"mistyrose"
  },
  {
    "value":"#EED5D2",
    "name":"mistyrose 2"
  },
  {
    "value":"#CDB7B5",
    "name":"mistyrose 3"
  },
  {
    "value":"#8B7D7B",
    "name":"mistyrose 4"
  },
  {
    "value":"#FFFAFA",
    "name":"snow 1"
  },
  {
    "value":"#FFFAFA",
    "css":true,
    "name":"snow"
  },
  {
    "value":"#EEE9E9",
    "name":"snow 2"
  },
  {
    "value":"#CDC9C9",
    "name":"snow 3"
  },
  {
    "value":"#8B8989",
    "name":"snow 4"
  },
  {
    "value":"#BC8F8F",
    "css":true,
    "name":"rosybrown"
  },
  {
    "value":"#FFC1C1",
    "name":"rosybrown 1"
  },
  {
    "value":"#EEB4B4",
    "name":"rosybrown 2"
  },
  {
    "value":"#CD9B9B",
    "name":"rosybrown 3"
  },
  {
    "value":"#8B6969",
    "name":"rosybrown 4"
  },
  {
    "value":"#F08080",
    "css":true,
    "name":"lightcoral"
  },
  {
    "value":"#CD5C5C",
    "css":true,
    "name":"indianred"
  },
  {
    "value":"#FF6A6A",
    "name":"indianred 1"
  },
  {
    "value":"#EE6363",
    "name":"indianred 2"
  },
  {
    "value":"#8B3A3A",
    "name":"indianred 4"
  },
  {
    "value":"#CD5555",
    "name":"indianred 3"
  },
  {
    "value":"#A52A2A",
    "css":true,
    "name":"brown"
  },
  {
    "value":"#FF4040",
    "name":"brown 1"
  },
  {
    "value":"#EE3B3B",
    "name":"brown 2"
  },
  {
    "value":"#CD3333",
    "name":"brown 3"
  },
  {
    "value":"#8B2323",
    "name":"brown 4"
  },
  {
    "value":"#B22222",
    "css":true,
    "name":"firebrick"
  },
  {
    "value":"#FF3030",
    "name":"firebrick 1"
  },
  {
    "value":"#EE2C2C",
    "name":"firebrick 2"
  },
  {
    "value":"#CD2626",
    "name":"firebrick 3"
  },
  {
    "value":"#8B1A1A",
    "name":"firebrick 4"
  },
  {
    "value":"#FF0000",
    "vga":true,
    "name":"red 1"
  },
  {
    "value":"#FF0000",
    "vga":true,
    "css":true,
    "name":"red"
  },
  {
    "value":"#EE0000",
    "name":"red 2"
  },
  {
    "value":"#CD0000",
    "name":"red 3"
  },
  {
    "value":"#8B0000",
    "name":"red 4"
  },
  {
    "value":"#8B0000",
    "css":true,
    "name":"darkred"
  },
  {
    "value":"#800000",
    "vga":true,
    "css":true,
    "name":"maroon"
  },
  {
    "value":"#8E388E",
    "name":"sgi beet"
  },
  {
    "value":"#7171C6",
    "name":"sgi slateblue"
  },
  {
    "value":"#7D9EC0",
    "name":"sgi lightblue"
  },
  {
    "value":"#388E8E",
    "name":"sgi teal"
  },
  {
    "value":"#71C671",
    "name":"sgi chartreuse"
  },
  {
    "value":"#8E8E38",
    "name":"sgi olivedrab"
  },
  {
    "value":"#C5C1AA",
    "name":"sgi brightgray"
  },
  {
    "value":"#C67171",
    "name":"sgi salmon"
  },
  {
    "value":"#555555",
    "name":"sgi darkgray"
  },
  {
    "value":"#1E1E1E",
    "name":"sgi gray 12"
  },
  {
    "value":"#282828",
    "name":"sgi gray 16"
  },
  {
    "value":"#515151",
    "name":"sgi gray 32"
  },
  {
    "value":"#5B5B5B",
    "name":"sgi gray 36"
  },
  {
    "value":"#848484",
    "name":"sgi gray 52"
  },
  {
    "value":"#8E8E8E",
    "name":"sgi gray 56"
  },
  {
    "value":"#AAAAAA",
    "name":"sgi lightgray"
  },
  {
    "value":"#B7B7B7",
    "name":"sgi gray 72"
  },
  {
    "value":"#C1C1C1",
    "name":"sgi gray 76"
  },
  {
    "value":"#EAEAEA",
    "name":"sgi gray 92"
  },
  {
    "value":"#F4F4F4",
    "name":"sgi gray 96"
  },
  {
    "value":"#FFFFFF",
    "vga":true,
    "css":true,
    "name":"white"
  },
  {
    "value":"#F5F5F5",
    "name":"white smoke"
  },
  {
    "value":"#F5F5F5",
    "name":"gray 96"
  },
  {
    "value":"#DCDCDC",
    "css":true,
    "name":"gainsboro"
  },
  {
    "value":"#D3D3D3",
    "css":true,
    "name":"lightgrey"
  },
  {
    "value":"#C0C0C0",
    "vga":true,
    "css":true,
    "name":"silver"
  },
  {
    "value":"#A9A9A9",
    "css":true,
    "name":"darkgray"
  },
  {
    "value":"#808080",
    "vga":true,
    "css":true,
    "name":"gray"
  },
  {
    "value":"#696969",
    "css":true,
    "name":"dimgray"
  },
  {
    "value":"#696969",
    "name":"gray 42"
  },
  {
    "value":"#000000",
    "vga":true,
    "css":true,
    "name":"black"
  },
  {
    "value":"#FCFCFC",
    "name":"gray 99"
  },
  {
    "value":"#FAFAFA",
    "name":"gray 98"
  },
  {
    "value":"#F7F7F7",
    "name":"gray 97"
  },
  {
    "value":"#F2F2F2",
    "name":"gray 95"
  },
  {
    "value":"#F0F0F0",
    "name":"gray 94"
  },
  {
    "value":"#EDEDED",
    "name":"gray 93"
  },
  {
    "value":"#EBEBEB",
    "name":"gray 92"
  },
  {
    "value":"#E8E8E8",
    "name":"gray 91"
  },
  {
    "value":"#E5E5E5",
    "name":"gray 90"
  },
  {
    "value":"#E3E3E3",
    "name":"gray 89"
  },
  {
    "value":"#E0E0E0",
    "name":"gray 88"
  },
  {
    "value":"#DEDEDE",
    "name":"gray 87"
  },
  {
    "value":"#DBDBDB",
    "name":"gray 86"
  },
  {
    "value":"#D9D9D9",
    "name":"gray 85"
  },
  {
    "value":"#D6D6D6",
    "name":"gray 84"
  },
  {
    "value":"#D4D4D4",
    "name":"gray 83"
  },
  {
    "value":"#D1D1D1",
    "name":"gray 82"
  },
  {
    "value":"#CFCFCF",
    "name":"gray 81"
  },
  {
    "value":"#CCCCCC",
    "name":"gray 80"
  },
  {
    "value":"#C9C9C9",
    "name":"gray 79"
  },
  {
    "value":"#C7C7C7",
    "name":"gray 78"
  },
  {
    "value":"#C4C4C4",
    "name":"gray 77"
  },
  {
    "value":"#C2C2C2",
    "name":"gray 76"
  },
  {
    "value":"#BFBFBF",
    "name":"gray 75"
  },
  {
    "value":"#BDBDBD",
    "name":"gray 74"
  },
  {
    "value":"#BABABA",
    "name":"gray 73"
  },
  {
    "value":"#B8B8B8",
    "name":"gray 72"
  },
  {
    "value":"#B5B5B5",
    "name":"gray 71"
  },
  {
    "value":"#B3B3B3",
    "name":"gray 70"
  },
  {
    "value":"#B0B0B0",
    "name":"gray 69"
  },
  {
    "value":"#ADADAD",
    "name":"gray 68"
  },
  {
    "value":"#ABABAB",
    "name":"gray 67"
  },
  {
    "value":"#A8A8A8",
    "name":"gray 66"
  },
  {
    "value":"#A6A6A6",
    "name":"gray 65"
  },
  {
    "value":"#A3A3A3",
    "name":"gray 64"
  },
  {
    "value":"#A1A1A1",
    "name":"gray 63"
  },
  {
    "value":"#9E9E9E",
    "name":"gray 62"
  },
  {
    "value":"#9C9C9C",
    "name":"gray 61"
  },
  {
    "value":"#999999",
    "name":"gray 60"
  },
  {
    "value":"#969696",
    "name":"gray 59"
  },
  {
    "value":"#949494",
    "name":"gray 58"
  },
  {
    "value":"#919191",
    "name":"gray 57"
  },
  {
    "value":"#8F8F8F",
    "name":"gray 56"
  },
  {
    "value":"#8C8C8C",
    "name":"gray 55"
  },
  {
    "value":"#8A8A8A",
    "name":"gray 54"
  },
  {
    "value":"#878787",
    "name":"gray 53"
  },
  {
    "value":"#858585",
    "name":"gray 52"
  },
  {
    "value":"#828282",
    "name":"gray 51"
  },
  {
    "value":"#7F7F7F",
    "name":"gray 50"
  },
  {
    "value":"#7D7D7D",
    "name":"gray 49"
  },
  {
    "value":"#7A7A7A",
    "name":"gray 48"
  },
  {
    "value":"#787878",
    "name":"gray 47"
  },
  {
    "value":"#757575",
    "name":"gray 46"
  },
  {
    "value":"#737373",
    "name":"gray 45"
  },
  {
    "value":"#707070",
    "name":"gray 44"
  },
  {
    "value":"#6E6E6E",
    "name":"gray 43"
  },
  {
    "value":"#666666",
    "name":"gray 40"
  },
  {
    "value":"#636363",
    "name":"gray 39"
  },
  {
    "value":"#616161",
    "name":"gray 38"
  },
  {
    "value":"#5E5E5E",
    "name":"gray 37"
  },
  {
    "value":"#5C5C5C",
    "name":"gray 36"
  },
  {
    "value":"#595959",
    "name":"gray 35"
  },
  {
    "value":"#575757",
    "name":"gray 34"
  },
  {
    "value":"#545454",
    "name":"gray 33"
  },
  {
    "value":"#525252",
    "name":"gray 32"
  },
  {
    "value":"#4F4F4F",
    "name":"gray 31"
  },
  {
    "value":"#4D4D4D",
    "name":"gray 30"
  },
  {
    "value":"#4A4A4A",
    "name":"gray 29"
  },
  {
    "value":"#474747",
    "name":"gray 28"
  },
  {
    "value":"#454545",
    "name":"gray 27"
  },
  {
    "value":"#424242",
    "name":"gray 26"
  },
  {
    "value":"#404040",
    "name":"gray 25"
  },
  {
    "value":"#3D3D3D",
    "name":"gray 24"
  },
  {
    "value":"#3B3B3B",
    "name":"gray 23"
  },
  {
    "value":"#383838",
    "name":"gray 22"
  },
  {
    "value":"#363636",
    "name":"gray 21"
  },
  {
    "value":"#333333",
    "name":"gray 20"
  },
  {
    "value":"#303030",
    "name":"gray 19"
  },
  {
    "value":"#2E2E2E",
    "name":"gray 18"
  },
  {
    "value":"#2B2B2B",
    "name":"gray 17"
  },
  {
    "value":"#292929",
    "name":"gray 16"
  },
  {
    "value":"#262626",
    "name":"gray 15"
  },
  {
    "value":"#242424",
    "name":"gray 14"
  },
  {
    "value":"#212121",
    "name":"gray 13"
  },
  {
    "value":"#1F1F1F",
    "name":"gray 12"
  },
  {
    "value":"#1C1C1C",
    "name":"gray 11"
  },
  {
    "value":"#1A1A1A",
    "name":"gray 10"
  },
  {
    "value":"#171717",
    "name":"gray 9"
  },
  {
    "value":"#141414",
    "name":"gray 8"
  },
  {
    "value":"#121212",
    "name":"gray 7"
  },
  {
    "value":"#0F0F0F",
    "name":"gray 6"
  },
  {
    "value":"#0D0D0D",
    "name":"gray 5"
  },
  {
    "value":"#0A0A0A",
    "name":"gray 4"
  },
  {
    "value":"#080808",
    "name":"gray 3"
  },
  {
    "value":"#050505",
    "name":"gray 2"
  },
  {
    "value":"#030303",
    "name":"gray 1"
  },
  {
    "value":"#F5F5F5",
    "css":true,
    "name":"whitesmoke"
  }
];

var colornames = createCommonjsModule(function (module) {
/**
 * Module dependencies
 */


var cssColors = colors$3.filter(function(color){
  return !! color.css
});

var vgaColors = colors$3.filter(function(color){
  return !! color.vga
});


/**
 * Get color value for a certain name.
 * @param name {String}
 * @return {String} Hex color value
 * @api public
 */

module.exports = function(name) {
  var color = module.exports.get(name);
  return color && color.value
};

/**
 * Get color object.
 *
 * @param name {String}
 * @return {Object} Color object
 * @api public
 */

module.exports.get = function(name) {
  name = name || '';
  name = name.trim().toLowerCase();
  return colors$3.filter(function(color){
    return color.name.toLowerCase() === name
  }).pop()
};

/**
 * Get all color object.
 *
 * @return {Array}
 * @api public
 */

module.exports.all = module.exports.get.all = function() {
 return colors$3
};

/**
 * Get color object compatible with CSS.
 *
 * @return {Array}
 * @api public
 */

module.exports.get.css = function(name) {
  if (!name) return cssColors
  name = name || '';
  name = name.trim().toLowerCase();
  return cssColors.filter(function(color){
    return color.name.toLowerCase() === name
  }).pop()
};



module.exports.get.vga = function(name) {
  if (!name) return vgaColors
  name = name || '';
  name = name.trim().toLowerCase();
  return vgaColors.filter(function(color){
    return color.name.toLowerCase() === name
  }).pop()
};
});
var colornames_1 = colornames.get;
var colornames_2 = colornames.all;

'use strict';



/**
 * Kuler: Color text using CSS colors
 *
 * @constructor
 * @param {String} text The text that needs to be styled
 * @param {String} color Optional color for alternate API.
 * @api public
 */
function Kuler(text, color) {
  if (color) return (new Kuler(text)).style(color);
  if (!(this instanceof Kuler)) return new Kuler(text);

  this.text = text;
}

/**
 * ANSI color codes.
 *
 * @type {String}
 * @private
 */
Kuler.prototype.prefix = '\x1b[';
Kuler.prototype.suffix = 'm';

/**
 * Parse a hex color string and parse it to it's RGB equiv.
 *
 * @param {String} color
 * @returns {Array}
 * @api private
 */
Kuler.prototype.hex = function hex(color) {
  color = color[0] === '#' ? color.substring(1) : color;

  //
  // Pre-parse for shorthand hex colors.
  //
  if (color.length === 3) {
    color = color.split('');

    color[5] = color[2]; // F60##0
    color[4] = color[2]; // F60#00
    color[3] = color[1]; // F60600
    color[2] = color[1]; // F66600
    color[1] = color[0]; // FF6600

    color = color.join('');
  }

  var r = color.substring(0, 2)
    , g = color.substring(2, 4)
    , b = color.substring(4, 6);

  return [ parseInt(r, 16), parseInt(g, 16), parseInt(b, 16) ];
};

/**
 * Transform a 255 RGB value to an RGV code.
 *
 * @param {Number} r Red color channel.
 * @param {Number} g Green color channel.
 * @param {Number} b Blue color channel.
 * @returns {String}
 * @api public
 */
Kuler.prototype.rgb = function rgb(r, g, b) {
  var red = r / 255 * 5
    , green = g / 255 * 5
    , blue = b / 255 * 5;

  return this.ansi(red, green, blue);
};

/**
 * Turns RGB 0-5 values into a single ANSI code.
 *
 * @param {Number} r Red color channel.
 * @param {Number} g Green color channel.
 * @param {Number} b Blue color channel.
 * @returns {String}
 * @api public
 */
Kuler.prototype.ansi = function ansi(r, g, b) {
  var red = Math.round(r)
    , green = Math.round(g)
    , blue = Math.round(b);

  return 16 + (red * 36) + (green * 6) + blue;
};

/**
 * Marks an end of color sequence.
 *
 * @returns {String} Reset sequence.
 * @api public
 */
Kuler.prototype.reset = function reset() {
  return this.prefix +'39;49'+ this.suffix;
};

/**
 * Colour the terminal using CSS.
 *
 * @param {String} color The HEX color code.
 * @returns {String} the escape code.
 * @api public
 */
Kuler.prototype.style = function style(color) {
  //
  // We've been supplied a CSS color name instead of a hex color format so we
  // need to transform it to proper CSS color and continue with our execution
  // flow.
  //
  if (!/^#?(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
    color = colornames(color);
  }

  return this.prefix +'38;5;'+ this.rgb.apply(this, this.hex(color)) + this.suffix + this.text + this.reset();
};


//
// Expose the actual interface.
//
var kuler = Kuler;

'use strict';



/**
 * Check if the terminal we're using allows the use of colors.
 *
 * @type {Boolean}
 * @private
 */
var tty$1 = tty.isatty(1);

/**
 * The default stream instance we should be writing against.
 *
 * @type {Stream}
 * @public
 */
var stream$2 = process.stdout;

/**
 * A simple environment based logger.
 *
 * Options:
 *
 * - colors: Force the use of colors or forcefully disable them. If this option
 *   is not supplied the colors will be based on your terminal.
 * - stream: The Stream instance we should write our logs to, defaults to
 *   process.stdout but can be anything you like.
 *
 * @param {String} name The namespace of your log function.
 * @param {Object} options Logger configuration.
 * @returns {Function} Configured logging method.
 * @api public
 */
function factory(name, options) {
  if (!enabled(name)) return function diagnopes() {};

  options = options || {};
  options.colors = 'colors' in options ? options.colors : tty$1;
  options.ansi = options.colors ? kuler(name, colorspace(name)) : name;
  options.stream = options.stream || stream$2;

  //
  // Allow multiple streams, so make sure it's an array which makes iteration
  // easier.
  //
  if (!Array.isArray(options.stream)) {
    options.stream = [options.stream];
  }

  //
  // The actual debug function which does the logging magic.
  //
  return function debug(line) {
    //
    // Better formatting for error instances.
    //
    if (line instanceof Error) line = line.stack || line.message || line;

    line = [
      //
      // Add the colorized namespace.
      //
      options.ansi,

      //
      // The total time we took to execute the next debug statement.
      //
      ' ',
      line
    ].join('');

    //
    // Use util.format so we can follow the same API as console.log.
    //
    line = util.format.apply(this, [line].concat(
        Array.prototype.slice.call(arguments, 1)
    )) + '\n';

    options.stream.forEach(function each(stream$$1) {
      stream$$1.write(line);
    });
  };
}

/**
 * Override the "default" stream that we write to. This allows you to globally
 * configure the steams.
 *
 * @param {Stream} output
 * @returns {function} Factory
 * @api private
 */
factory.to = function to(output) {
  stream$2 = output;
  return factory;
};

//
// Expose the module.
//
var diagnostics = factory;

/**
 * tail-file.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';


const { StringDecoder: StringDecoder$2 } = string_decoder;
const { Stream } = readable;

/**
 * Simple no-op function.
 * @returns {undefined}
 */
function noop$1() {}

/**
 * TODO: add function description.
 * @param {Object} options - Options for tail.
 * @param {function} iter - Iterator function to execute on every line.
* `tail -f` a file. Options must include file.
 * @returns {mixed} - TODO: add return description.
 */
var tailFile = (options, iter) => {
  const buffer$$1 = Buffer.alloc(64 * 1024);
  const decode = new StringDecoder$2('utf8');
  const stream$$1 = new Stream();
  let buff = '';
  let pos = 0;
  let row = 0;

  if (options.start === -1) {
    delete options.start;
  }

  stream$$1.readable = true;
  stream$$1.destroy = () => {
    stream$$1.destroyed = true;
    stream$$1.emit('end');
    stream$$1.emit('close');
  };

  fs.open(options.file, 'a+', '0644', (err, fd) => {
    if (err) {
      if (!iter) {
        stream$$1.emit('error', err);
      } else {
        iter(err);
      }
      stream$$1.destroy();
      return;
    }

    (function read() {
      if (stream$$1.destroyed) {
        fs.close(fd, noop$1);
        return;
      }

      return fs.read(fd, buffer$$1, 0, buffer$$1.length, pos, (err, bytes) => {
        if (err) {
          if (!iter) {
            stream$$1.emit('error', err);
          } else {
            iter(err);
          }
          stream$$1.destroy();
          return;
        }

        if (!bytes) {
          if (buff) {
            // eslint-disable-next-line eqeqeq
            if (options.start == null || row > options.start) {
              if (!iter) {
                stream$$1.emit('line', buff);
              } else {
                iter(null, buff);
              }
            }
            row++;
            buff = '';
          }
          return setTimeout(read, 1000);
        }

        let data = decode.write(buffer$$1.slice(0, bytes));
        if (!iter) {
          stream$$1.emit('data', data);
        }

        data = (buff + data).split(/\n+/);

        const l = data.length - 1;
        let i = 0;

        for (; i < l; i++) {
          // eslint-disable-next-line eqeqeq
          if (options.start == null || row > options.start) {
            if (!iter) {
              stream$$1.emit('line', data[i]);
            } else {
              iter(null, data[i]);
            }
          }
          row++;
        }

        buff = data[l];
        pos += bytes;
        return read();
      });
    }());
  });

  if (!iter) {
    return stream$$1;
  }

  return stream$$1.destroy;
};

/**
 * file.js: Transport for outputting to a local log file.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';





const { MESSAGE: MESSAGE$1 } = tripleBeam;
const { Stream: Stream$1, PassThrough: PassThrough$1 } = readable;

const debug$1 = diagnostics('winston:file');



/**
 * Transport for outputting to a local log file.
 * @type {File}
 * @extends {TransportStream}
 */
var file = class File extends winstonTransport {
  /**
   * Constructor function for the File transport object responsible for
   * persisting log messages and metadata to one or more files.
   * @param {Object} options - Options for this instance.
   */
  constructor(options = {}) {
    super(options);

    // Expose the name of this Transport on the prototype.
    this.name = options.name || 'file';

    // Helper function which throws an `Error` in the event that any of the
    // rest of the arguments is present in `options`.
    function throwIf(target, ...args) {
      args.slice(1).forEach(name => {
        if (options[name]) {
          throw new Error(`Cannot set ${name} and ${target} together`);
        }
      });
    }

    // Setup the base stream that always gets piped to to handle buffering.
    this._stream = new PassThrough$1();
    this._stream.setMaxListeners(30);

    // Bind this context for listener methods.
    this._onError = this._onError.bind(this);

    if (options.filename || options.dirname) {
      throwIf('filename or dirname', 'stream');
      this._basename = this.filename = options.filename
        ? path.basename(options.filename)
        : 'winston.log';

      this.dirname = options.dirname || path.dirname(options.filename);
      this.options = options.options || { flags: 'a' };
    } else if (options.stream) {
      // eslint-disable-next-line no-console
      console.warn('options.stream will be removed in winston@4. Use winston.transports.Stream');
      throwIf('stream', 'filename', 'maxsize');
      this._dest = this._stream.pipe(this._setupStream(options.stream));
      // We need to listen for drain events when write() returns false. This
      // can make node mad at times.
    } else {
      throw new Error('Cannot log to file without filename or stream.');
    }

    this.maxsize = options.maxsize || null;
    this.rotationFormat = options.rotationFormat || false;
    this.zippedArchive = options.zippedArchive || false;
    this.maxFiles = options.maxFiles || null;
    this.eol = options.eol || os.EOL;
    this.tailable = options.tailable || false;

    // Internal state variables representing the number of files this instance
    // has created and the current size (in bytes) of the current logfile.
    this._size = 0;
    this._pendingSize = 0;
    this._created = 0;
    this._drain = false;
    this._opening = false;

    this.open();
  }

  /**
   * Core logging method exposed to Winston. Metadata is optional.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */
  log(info, callback = () => {}) {
    // Remark: (jcrugzz) What is necessary about this callback(null, true) now
    // when thinking about 3.x? Should silent be handled in the base
    // TransportStream _write method?
    if (this.silent) {
      callback();
      return true;
    }

    // Output stream buffer is full and has asked us to wait for the drain event
    if (this._drain) {
      this._stream.once('drain', () => {
        this._drain = false;
        this.log(info, callback);
      });
      return;
    }

    // Grab the raw string and append the expected EOL.
    const output = `${info[MESSAGE$1]}${this.eol}`;
    const bytes = Buffer.byteLength(output);

    // After we have written to the PassThrough check to see if we need
    // to rotate to the next file.
    //
    // Remark: This gets called too early and does not depict when data
    // has been actually flushed to disk.
    function logged() {
      this._size += bytes;
      this._pendingSize -= bytes;

      debug$1('logged %s %s', this._size, output);
      this.emit('logged', info);

      // Do not attempt to rotate files while opening
      if (this._opening) {
        return;
      }

      // Check to see if we need to end the stream and create a new one.
      if (!this._needsNewFile()) {
        return;
      }

      // End the current stream, ensure it flushes and create a new one.
      // This could potentially be optimized to not run a stat call but its
      // the safest way since we are supporting `maxFiles`.
      this._endStream(() => this._rotateFile());
    }

    // Keep track of the pending bytes being written while files are opening
    // in order to properly rotate the PassThrough this._stream when the file
    // eventually does open.
    this._pendingSize += bytes;
    if (this._opening
      && !this.rotatedWhileOpening
      && this._needsNewFile(this._size + this._pendingSize)) {
      this.rotatedWhileOpening = true;
    }

    const written = this._stream.write(output, logged.bind(this));
    if (!written) {
      this._drain = true;
      this._stream.once('drain', () => {
        this._drain = false;
        callback();
      });
    } else {
      callback(); // eslint-disable-line callback-return
    }

    debug$1('written', written, this._drain);

    return written;
  }

  /**
   * Query the transport. Options object is optional.
   * @param {Object} options - Loggly-like query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * TODO: Refactor me.
   */
  query(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    options = this.normalizeQuery(options);
    const file = path.join(this.dirname, this.filename);
    let buff = '';
    let results = [];
    let row = 0;

    const stream$$1 = fs.createReadStream(file, {
      encoding: 'utf8'
    });

    stream$$1.on('error', err => {
      if (stream$$1.readable) {
        stream$$1.destroy();
      }
      if (!callback) {
        return;
      }

      return err.code !== 'ENOENT' ? callback(err) : callback(null, results);
    });

    stream$$1.on('data', data => {
      data = (buff + data).split(/\n+/);
      const l = data.length - 1;
      let i = 0;

      for (; i < l; i++) {
        if (!options.start || row >= options.start) {
          add(data[i]);
        }
        row++;
      }

      buff = data[l];
    });

    stream$$1.on('close', () => {
      if (buff) {
        add(buff, true);
      }
      if (options.order === 'desc') {
        results = results.reverse();
      }

      // eslint-disable-next-line callback-return
      if (callback) callback(null, results);
    });

    function add(buff, attempt) {
      try {
        const log = JSON.parse(buff);
        if (check(log)) {
          push(log);
        }
      } catch (e) {
        if (!attempt) {
          stream$$1.emit('error', e);
        }
      }
    }

    function push(log) {
      if (
        options.rows &&
        results.length >= options.rows &&
        options.order !== 'desc'
      ) {
        if (stream$$1.readable) {
          stream$$1.destroy();
        }
        return;
      }

      if (options.fields) {
        log = options.fields.reduce((obj, key) => {
          obj[key] = log[key];
          return obj;
        }, {});
      }

      if (options.order === 'desc') {
        if (results.length >= options.rows) {
          results.shift();
        }
      }
      results.push(log);
    }

    function check(log) {
      if (!log) {
        return;
      }

      if (typeof log !== 'object') {
        return;
      }

      const time = new Date(log.timestamp);
      if (
        (options.from && time < options.from) ||
        (options.until && time > options.until) ||
        (options.level && options.level !== log.level)
      ) {
        return;
      }

      return true;
    }
  }

  /**
   * Returns a log stream for this transport. Options object is optional.
   * @param {Object} options - Stream options for this instance.
   * @returns {Stream} - TODO: add return description.
   * TODO: Refactor me.
   */
  stream(options = {}) {
    const file = path.join(this.dirname, this.filename);
    const stream$$1 = new Stream$1();
    const tail = {
      file,
      start: options.start
    };

    stream$$1.destroy = tailFile(tail, (err, line) => {
      if (err) {
        return stream$$1.emit('error', err);
      }

      try {
        stream$$1.emit('data', line);
        line = JSON.parse(line);
        stream$$1.emit('log', line);
      } catch (e) {
        stream$$1.emit('error', e);
      }
    });

    return stream$$1;
  }

  /**
   * Checks to see the filesize of.
   * @returns {undefined}
   */
  open() {
    // If we do not have a filename then we were passed a stream and
    // don't need to keep track of size.
    if (!this.filename) return;
    if (this._opening) return;

    this._opening = true;

    // Stat the target file to get the size and create the stream.
    this.stat((err, size) => {
      if (err) {
        return this.emit('error', err);
      }

      debug$1('stat done: %s { size: %s }', this.filename, size);
      this._size = size;
      this._dest = this._createStream(this._stream);
      this._opening = false;
    });
  }

  /**
   * Stat the file and assess information in order to create the proper stream.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */
  stat(callback) {
    const target = this._getFile();
    const fullpath = path.join(this.dirname, target);

    fs.stat(fullpath, (err, stat) => {
      if (err && err.code === 'ENOENT') {
        debug$1('ENOENT ok', fullpath);
        // Update internally tracked filename with the new target name.
        this.filename = target;
        return callback(null, 0);
      }

      if (err) {
        debug$1(`err ${err.code} ${fullpath}`);
        return callback(err);
      }

      if (!stat || this._needsNewFile(stat.size)) {
        // If `stats.size` is greater than the `maxsize` for this
        // instance then try again.
        return this._incFile(() => this.stat(callback));
      }

      // Once we have figured out what the filename is, set it
      // and return the size.
      this.filename = target;
      callback(null, stat.size);
    });
  }

  /**
   * Closes the stream associated with this instance.
   * @param {function} cb - TODO: add param description.
   * @returns {undefined}
   */
  close(cb) {
    if (!this._stream) {
      return;
    }

    this._stream.end(() => {
      if (cb) {
        cb(); // eslint-disable-line callback-return
      }
      this.emit('flush');
      this.emit('closed');
    });
  }

  /**
   * TODO: add method description.
   * @param {number} size - TODO: add param description.
   * @returns {undefined}
   */
  _needsNewFile(size) {
    size = size || this._size;
    return this.maxsize && size >= this.maxsize;
  }

  /**
   * TODO: add method description.
   * @param {Error} err - TODO: add param description.
   * @returns {undefined}
   */
  _onError(err) {
    this.emit('error', err);
  }

  /**
   * TODO: add method description.
   * @param {Stream} stream - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */
  _setupStream(stream$$1) {
    stream$$1.on('error', this._onError);

    return stream$$1;
  }

  /**
   * TODO: add method description.
   * @param {Stream} stream - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */
  _cleanupStream(stream$$1) {
    stream$$1.removeListener('error', this._onError);

    return stream$$1;
  }

  /**
   * TODO: add method description.
   */
  _rotateFile() {
    this._incFile(() => this.open());
  }

  /**
   * Unpipe from the stream that has been marked as full and end it so it
   * flushes to disk.
   *
   * @param {function} callback - Callback for when the current file has closed.
   * @private
   */
  _endStream(callback) {
    this._stream.unpipe(this._dest);
    this._dest.end(() => {
      this._cleanupStream(this._dest);
      callback();
    });
  }

  /**
   * Returns the WritableStream for the active file on this instance. If we
   * should gzip the file then a zlib stream is returned.
   *
   * @param {ReadableStream} source – PassThrough to pipe to the file when open.
   * @returns {WritableStream} Stream that writes to disk for the active file.
   */
  _createStream(source) {
    const fullpath = path.join(this.dirname, this.filename);

    debug$1('create stream start', fullpath, this.options);
    const dest = fs.createWriteStream(fullpath, this.options)
      // TODO: What should we do with errors here?
      .on('error', err => debug$1(err))
      .on('close', () => debug$1('close', dest.path, dest.bytesWritten))
      .on('open', () => {
        debug$1('file open ok', fullpath);
        this.emit('open', fullpath);
        source.pipe(dest);

        // If rotation occured during the open operation then we immediately
        // start writing to a new PassThrough, begin opening the next file
        // and cleanup the previous source and dest once the source has drained.
        if (this.rotatedWhileOpening) {
          this._stream = new PassThrough$1();
          this._stream.setMaxListeners(30);
          this._rotateFile();
          this.rotatedWhileOpening = false;
          this._cleanupStream(dest);
          source.end();
        }
      });

    debug$1('create stream ok', fullpath);
    if (this.zippedArchive) {
      const gzip = zlib.createGzip();
      gzip.pipe(dest);
      return gzip;
    }

    return dest;
  }

  /**
   * TODO: add method description.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */
  _incFile(callback) {
    debug$1('_incFile', this.filename);
    const ext = path.extname(this._basename);
    const basename = path.basename(this._basename, ext);

    if (!this.tailable) {
      this._created += 1;
      this._checkMaxFilesIncrementing(ext, basename, callback);
    } else {
      this._checkMaxFilesTailable(ext, basename, callback);
    }
  }

  /**
   * Gets the next filename to use for this instance in the case that log
   * filesizes are being capped.
   * @returns {string} - TODO: add return description.
   * @private
   */
  _getFile() {
    const ext = path.extname(this._basename);
    const basename = path.basename(this._basename, ext);
    const isRotation = this.rotationFormat
      ? this.rotationFormat()
      : this._created;

    // Caveat emptor (indexzero): rotationFormat() was broken by design When
    // combined with max files because the set of files to unlink is never
    // stored.
    const target = !this.tailable && this._created
      ? `${basename}${isRotation}${ext}`
      : `${basename}${ext}`;

    return this.zippedArchive
      ? `${target}.gz`
      : target;
  }

  /**
   * Increment the number of files created or checked by this instance.
   * @param {mixed} ext - TODO: add param description.
   * @param {mixed} basename - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {undefined}
   * @private
   */
  _checkMaxFilesIncrementing(ext, basename, callback) {
    // Check for maxFiles option and delete file.
    if (!this.maxFiles || this._created < this.maxFiles) {
      return setImmediate(callback);
    }

    const oldest = this._created - this.maxFiles;
    const isOldest = oldest !== 0 ? oldest : '';
    const isZipped = this.zippedArchive ? '.gz' : '';
    const filePath = `${basename}${isOldest}${ext}${isZipped}`;
    const target = path.join(this.dirname, filePath);

    fs.unlink(target, callback);
  }

  /**
   * Roll files forward based on integer, up to maxFiles. e.g. if base if
   * file.log and it becomes oversized, roll to file1.log, and allow file.log
   * to be re-used. If file is oversized again, roll file1.log to file2.log,
   * roll file.log to file1.log, and so on.
   * @param {mixed} ext - TODO: add param description.
   * @param {mixed} basename - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {undefined}
   * @private
   */
  _checkMaxFilesTailable(ext, basename, callback) {
    const tasks = [];
    if (!this.maxFiles) {
      return;
    }

    // const isZipped = this.zippedArchive ? '.gz' : '';
    const isZipped = this.zippedArchive ? '.gz' : '';
    for (let x = this.maxFiles - 1; x > 1; x--) {
      tasks.push(function (i, cb) {
        let fileName = `${basename}${(i - 1)}${ext}${isZipped}`;
        const tmppath = path.join(this.dirname, fileName);

        fs.exists(tmppath, exists => {
          if (!exists) {
            return cb(null);
          }

          fileName = `${basename}${i}${ext}${isZipped}`;
          fs.rename(tmppath, path.join(this.dirname, fileName), cb);
        });
      }.bind(this, x));
    }

    series_1(tasks, () => {
      fs.rename(
        path.join(this.dirname, `${basename}${ext}`),
        path.join(this.dirname, `${basename}1${ext}${isZipped}`),
        callback
      );
    });
  }
};

/**
 * http.js: Transport for outputting to a json-rpcserver.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';



const { Stream: Stream$2 } = readable;


/**
 * Transport for outputting to a json-rpc server.
 * @type {Stream}
 * @extends {TransportStream}
 */
var http_1 = class Http extends winstonTransport {
  /**
   * Constructor function for the Http transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options = {}) {
    super(options);

    this.name = options.name || 'http';
    this.ssl = !!options.ssl;
    this.host = options.host || 'localhost';
    this.port = options.port;
    this.auth = options.auth;
    this.path = options.path || '';
    this.agent = options.agent;
    this.headers = options.headers || {};
    this.headers['content-type'] = 'application/json';

    if (!this.port) {
      this.port = this.ssl ? 443 : 80;
    }
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */
  log(info, callback) {
    this._request(info, (err, res) => {
      if (res && res.statusCode !== 200) {
        err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
      }

      if (err) {
        this.emit('warn', err);
      } else {
        this.emit('logged', info);
      }
    });

    // Remark: (jcrugzz) Fire and forget here so requests dont cause buffering
    // and block more requests from happening?
    if (callback) {
      setImmediate(callback);
    }
  }

  /**
   * Query the transport. Options object is optional.
   * @param {Object} options -  Loggly-like query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * @returns {undefined}
   */
  query(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    options = {
      method: 'query',
      params: this.normalizeQuery(options)
    };

    if (options.params.path) {
      options.path = options.params.path;
      delete options.params.path;
    }

    if (options.params.auth) {
      options.auth = options.params.auth;
      delete options.params.auth;
    }

    this._request(options, (err, res, body) => {
      if (res && res.statusCode !== 200) {
        err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
      }

      if (err) {
        return callback(err);
      }

      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return callback(e);
        }
      }

      callback(null, body);
    });
  }

  /**
   * Returns a log stream for this transport. Options object is optional.
   * @param {Object} options - Stream options for this instance.
   * @returns {Stream} - TODO: add return description
   */
  stream(options = {}) {
    const stream$$1 = new Stream$2();
    options = {
      method: 'stream',
      params: options
    };

    if (options.params.path) {
      options.path = options.params.path;
      delete options.params.path;
    }

    if (options.params.auth) {
      options.auth = options.params.auth;
      delete options.params.auth;
    }

    let buff = '';
    const req = this._request(options);

    stream$$1.destroy = () => req.destroy();
    req.on('data', data => {
      data = (buff + data).split(/\n+/);
      const l = data.length - 1;

      let i = 0;
      for (; i < l; i++) {
        try {
          stream$$1.emit('log', JSON.parse(data[i]));
        } catch (e) {
          stream$$1.emit('error', e);
        }
      }

      buff = data[l];
    });
    req.on('error', err => stream$$1.emit('error', err));

    return stream$$1;
  }

  /**
   * Make a request to a winstond server or any http server which can
   * handle json-rpc.
   * @param {function} options - Options to sent the request.
   * @param {function} callback - Continuation to respond to when complete.
   */
  _request(options, callback) {
    options = options || {};

    const auth = options.auth || this.auth;
    const path$$1 = options.path || this.path || '';

    delete options.auth;
    delete options.path;

    // Prepare options for outgoing HTTP request
    const req = (this.ssl ? https : http).request({
      method: 'POST',
      host: this.host,
      port: this.port,
      path: `/${path$$1.replace(/^\//, '')}`,
      headers: this.headers,
      auth: auth ? (`${auth.username}:${auth.password}`) : '',
      agent: this.agent
    });

    req.on('error', callback);
    req.on('response', res => (
      res.on('end', () => callback(null, res)).resume()
    ));
    req.end(Buffer.from(JSON.stringify(options), 'utf8'));
  }
};

var isStream_1 = createCommonjsModule(function (module) {
'use strict';

var isStream = module.exports = function (stream$$1) {
	return stream$$1 !== null && typeof stream$$1 === 'object' && typeof stream$$1.pipe === 'function';
};

isStream.writable = function (stream$$1) {
	return isStream(stream$$1) && stream$$1.writable !== false && typeof stream$$1._write === 'function' && typeof stream$$1._writableState === 'object';
};

isStream.readable = function (stream$$1) {
	return isStream(stream$$1) && stream$$1.readable !== false && typeof stream$$1._read === 'function' && typeof stream$$1._readableState === 'object';
};

isStream.duplex = function (stream$$1) {
	return isStream.writable(stream$$1) && isStream.readable(stream$$1);
};

isStream.transform = function (stream$$1) {
	return isStream.duplex(stream$$1) && typeof stream$$1._transform === 'function' && typeof stream$$1._transformState === 'object';
};
});

/**
 * stream.js: Transport for outputting to any arbitrary stream.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';


const { MESSAGE: MESSAGE$2 } = tripleBeam;



/**
 * Transport for outputting to any arbitrary stream.
 * @type {Stream}
 * @extends {TransportStream}
 */
var stream$3 = class Stream extends winstonTransport {
  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options = {}) {
    super(options);

    if (!options.stream || !isStream_1(options.stream)) {
      throw new Error('options.stream is required.');
    }

    // We need to listen for drain events when write() returns false. This can
    // make node mad at times.
    this._stream = options.stream;
    this._stream.setMaxListeners(Infinity);
    this.isObjectMode = options.stream._writableState.objectMode;
    this.eol = options.eol || os.EOL;
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */
  log(info, callback) {
    setImmediate(() => this.emit('logged', info));
    if (this.isObjectMode) {
      this._stream.write(info);
      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    }

    this._stream.write(`${info[MESSAGE$2]}${this.eol}`);
    if (callback) {
      callback(); // eslint-disable-line callback-return
    }
    return;
  }
};

var transports = createCommonjsModule(function (module, exports) {
/**
 * transports.js: Set of all transports Winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * TODO: add property description.
 * @type {Console}
 */
Object.defineProperty(exports, 'Console', {
  configurable: true,
  enumerable: true,
  get() {
    return console_1;
  }
});

/**
 * TODO: add property description.
 * @type {File}
 */
Object.defineProperty(exports, 'File', {
  configurable: true,
  enumerable: true,
  get() {
    return file;
  }
});

/**
 * TODO: add property description.
 * @type {Http}
 */
Object.defineProperty(exports, 'Http', {
  configurable: true,
  enumerable: true,
  get() {
    return http_1;
  }
});

/**
 * TODO: add property description.
 * @type {Stream}
 */
Object.defineProperty(exports, 'Stream', {
  configurable: true,
  enumerable: true,
  get() {
    return stream$3;
  }
});
});

/**
 * index.js: Default settings for all levels that winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';


const { configs } = tripleBeam;

/**
 * Export config set for the CLI.
 * @type {Object}
 */
var cli$1 = logform.levels(configs.cli);

/**
 * Export config set for npm.
 * @type {Object}
 */
var npm$1 = logform.levels(configs.npm);

/**
 * Export config set for the syslog.
 * @type {Object}
 */
var syslog$1 = logform.levels(configs.syslog);

/**
 * Hoist addColors from logform where it was refactored into in winston@3.
 * @type {Object}
 */
var addColors = logform.levels;

var config$1 = {
	cli: cli$1,
	npm: npm$1,
	syslog: syslog$1,
	addColors: addColors
};

var eachOf = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (coll, iteratee, callback) {
    var eachOfImplementation = (0, _isArrayLike2.default)(coll) ? eachOfArrayLike : eachOfGeneric;
    eachOfImplementation(coll, (0, _wrapAsync2.default)(iteratee), callback);
};



var _isArrayLike2 = _interopRequireDefault(isArrayLike_1);



var _breakLoop2 = _interopRequireDefault(breakLoop);



var _eachOfLimit2 = _interopRequireDefault(eachOfLimit_1);



var _doLimit2 = _interopRequireDefault(doLimit_1);



var _noop2 = _interopRequireDefault(noop_1);



var _once2 = _interopRequireDefault(once_1);



var _onlyOnce2 = _interopRequireDefault(onlyOnce_1);



var _wrapAsync2 = _interopRequireDefault(wrapAsync_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eachOf implementation optimized for array-likes
function eachOfArrayLike(coll, iteratee, callback) {
    callback = (0, _once2.default)(callback || _noop2.default);
    var index = 0,
        completed = 0,
        length = coll.length;
    if (length === 0) {
        callback(null);
    }

    function iteratorCallback(err, value) {
        if (err) {
            callback(err);
        } else if (++completed === length || value === _breakLoop2.default) {
            callback(null);
        }
    }

    for (; index < length; index++) {
        iteratee(coll[index], index, (0, _onlyOnce2.default)(iteratorCallback));
    }
}

// a generic version of eachOf which can handle array, object, and iterator cases.
var eachOfGeneric = (0, _doLimit2.default)(_eachOfLimit2.default, Infinity);

/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * var obj = {dev: "/dev.json", test: "/test.json", prod: "/prod.json"};
 * var configs = {};
 *
 * async.forEachOf(obj, function (value, key, callback) {
 *     fs.readFile(__dirname + value, "utf8", function (err, data) {
 *         if (err) return callback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }, function (err) {
 *     if (err) console.error(err.message);
 *     // configs is now a map of JSON data
 *     doSomethingWith(configs);
 * });
 */
module.exports = exports['default'];
});

unwrapExports(eachOf);

var withoutIndex = createCommonjsModule(function (module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _withoutIndex;
function _withoutIndex(iteratee) {
    return function (value, index, callback) {
        return iteratee(value, callback);
    };
}
module.exports = exports["default"];
});

unwrapExports(withoutIndex);

var forEach = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = eachLimit;



var _eachOf2 = _interopRequireDefault(eachOf);



var _withoutIndex2 = _interopRequireDefault(withoutIndex);



var _wrapAsync2 = _interopRequireDefault(wrapAsync_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @example
 *
 * // assuming openFiles is an array of file names and saveFile is a function
 * // to save the modified contents of that file:
 *
 * async.each(openFiles, saveFile, function(err){
 *   // if any of the saves produced an error, err would equal that error
 * });
 *
 * // assuming openFiles is an array of file names
 * async.each(openFiles, function(file, callback) {
 *
 *     // Perform operation on file here.
 *     console.log('Processing file ' + file);
 *
 *     if( file.length > 32 ) {
 *       console.log('This file name is too long');
 *       callback('File name too long');
 *     } else {
 *       // Do work to process file here
 *       console.log('File processed');
 *       callback();
 *     }
 * }, function(err) {
 *     // if any of the file processing produced an error, err would equal that error
 *     if( err ) {
 *       // One of the iterations produced an error.
 *       // All processing will now stop.
 *       console.log('A file failed to process');
 *     } else {
 *       console.log('All files have been processed successfully');
 *     }
 * });
 */
function eachLimit(coll, iteratee, callback) {
  (0, _eachOf2.default)(coll, (0, _withoutIndex2.default)((0, _wrapAsync2.default)(iteratee)), callback);
}
module.exports = exports['default'];
});

unwrapExports(forEach);

'use strict';

/**
 * Wrap callbacks to prevent double execution.
 *
 * @param {Function} fn Function that should only be called once.
 * @returns {Function} A wrapped callback which prevents execution.
 * @api public
 */
var oneTime = function one(fn) {
  var called = 0
    , value;

  /**
   * The function that prevents double execution.
   *
   * @api private
   */
  function onetime() {
    if (called) return value;

    called = 1;
    value = fn.apply(this, arguments);
    fn = null;

    return value;
  }

  //
  // To make debugging more easy we want to use the name of the supplied
  // function. So when you look at the functions that are assigned to event
  // listeners you don't see a load of `onetime` functions but actually the
  // names of the functions that this module will call.
  //
  onetime.displayName = fn.displayName || fn.name || onetime.displayName || onetime.name;
  return onetime;
};

var stackTrace = createCommonjsModule(function (module, exports) {
exports.get = function(belowFn) {
  var oldLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;

  var dummyObject = {};

  var v8Handler = Error.prepareStackTrace;
  Error.prepareStackTrace = function(dummyObject, v8StackTrace) {
    return v8StackTrace;
  };
  Error.captureStackTrace(dummyObject, belowFn || exports.get);

  var v8StackTrace = dummyObject.stack;
  Error.prepareStackTrace = v8Handler;
  Error.stackTraceLimit = oldLimit;

  return v8StackTrace;
};

exports.parse = function(err) {
  if (!err.stack) {
    return [];
  }

  var self = this;
  var lines = err.stack.split('\n').slice(1);

  return lines
    .map(function(line) {
      if (line.match(/^\s*[-]{4,}$/)) {
        return self._createParsedCallSite({
          fileName: line,
          lineNumber: null,
          functionName: null,
          typeName: null,
          methodName: null,
          columnNumber: null,
          'native': null,
        });
      }

      var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
      if (!lineMatch) {
        return;
      }

      var object = null;
      var method = null;
      var functionName = null;
      var typeName = null;
      var methodName = null;
      var isNative = (lineMatch[5] === 'native');

      if (lineMatch[1]) {
        functionName = lineMatch[1];
        var methodStart = functionName.lastIndexOf('.');
        if (functionName[methodStart-1] == '.')
          methodStart--;
        if (methodStart > 0) {
          object = functionName.substr(0, methodStart);
          method = functionName.substr(methodStart + 1);
          var objectEnd = object.indexOf('.Module');
          if (objectEnd > 0) {
            functionName = functionName.substr(objectEnd + 1);
            object = object.substr(0, objectEnd);
          }
        }
        typeName = null;
      }

      if (method) {
        typeName = object;
        methodName = method;
      }

      if (method === '<anonymous>') {
        methodName = null;
        functionName = null;
      }

      var properties = {
        fileName: lineMatch[2] || null,
        lineNumber: parseInt(lineMatch[3], 10) || null,
        functionName: functionName,
        typeName: typeName,
        methodName: methodName,
        columnNumber: parseInt(lineMatch[4], 10) || null,
        'native': isNative,
      };

      return self._createParsedCallSite(properties);
    })
    .filter(function(callSite) {
      return !!callSite;
    });
};

function CallSite(properties) {
  for (var property in properties) {
    this[property] = properties[property];
  }
}

var strProperties = [
  'this',
  'typeName',
  'functionName',
  'methodName',
  'fileName',
  'lineNumber',
  'columnNumber',
  'function',
  'evalOrigin'
];
var boolProperties = [
  'topLevel',
  'eval',
  'native',
  'constructor'
];
strProperties.forEach(function (property) {
  CallSite.prototype[property] = null;
  CallSite.prototype['get' + property[0].toUpperCase() + property.substr(1)] = function () {
    return this[property];
  };
});
boolProperties.forEach(function (property) {
  CallSite.prototype[property] = false;
  CallSite.prototype['is' + property[0].toUpperCase() + property.substr(1)] = function () {
    return this[property];
  };
});

exports._createParsedCallSite = function(properties) {
  return new CallSite(properties);
};
});
var stackTrace_1 = stackTrace.get;
var stackTrace_2 = stackTrace.parse;
var stackTrace_3 = stackTrace._createParsedCallSite;

/**
 * exception-stream.js: TODO: add file header handler.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';



/**
 * TODO: add class description.
 * @type {ExceptionStream}
 * @extends {Writable}
 */
var exceptionStream = class ExceptionStream extends writable {
  /**
   * Constructor function for the ExceptionStream responsible for wrapping a
   * TransportStream; only allowing writes of `info` objects with
   * `info.exception` set to true.
   * @param {!TransportStream} transport - Stream to filter to exceptions
   */
  constructor(transport) {
    super({ objectMode: true });

    if (!transport) {
      throw new Error('ExceptionStream requires a TransportStream instance.');
    }

    // Remark (indexzero): we set `handleExceptions` here because it's the
    // predicate checked in ExceptionHandler.prototype.__getExceptionHandlers
    this.handleExceptions = true;
    this.transport = transport;
  }

  /**
   * Writes the info object to our transport instance if (and only if) the
   * `exception` property is set on the info.
   * @param {mixed} info - TODO: add param description.
   * @param {mixed} enc - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   * @private
   */
  _write(info, enc, callback) {
    if (info.exception) {
      return this.transport.log(info, callback);
    }

    callback();
    return true;
  }
};

/**
 * exception-handler.js: Object for handling uncaughtException events.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';



const debug$2 = diagnostics('winston:exception');




/**
 * Object for handling uncaughtException events.
 * @type {ExceptionHandler}
 */
var exceptionHandler = class ExceptionHandler {
  /**
   * TODO: add contructor description
   * @param {!Logger} logger - TODO: add param description
   */
  constructor(logger) {
    if (!logger) {
      throw new Error('Logger is required to handle exceptions');
    }

    this.logger = logger;
    this.handlers = new Map();
  }

  /**
   * Handles `uncaughtException` events for the current process by adding any
   * handlers passed in.
   * @returns {undefined}
   */
  handle(...args) {
    args.forEach(arg => {
      if (Array.isArray(arg)) {
        return arg.forEach(handler => this._addHandler(handler));
      }

      this._addHandler(arg);
    });

    if (!this.catcher) {
      this.catcher = this._uncaughtException.bind(this);
      process.on('uncaughtException', this.catcher);
    }
  }

  /**
   * Removes any handlers to `uncaughtException` events for the current
   * process. This does not modify the state of the `this.handlers` set.
   * @returns {undefined}
   */
  unhandle() {
    if (this.catcher) {
      process.removeListener('uncaughtException', this.catcher);
      this.catcher = false;

      Array.from(this.handlers.values())
        .forEach(wrapper => this.logger.unpipe(wrapper));
    }
  }

  /**
   * TODO: add method description
   * @param {Error} err - Error to get information about.
   * @returns {mixed} - TODO: add return description.
   */
  getAllInfo(err) {
    let { message } = err;
    if (!message && typeof err === 'string') {
      message = err;
    }

    return {
      error: err,
      // TODO (indexzero): how do we configure this?
      level: 'error',
      message: [
        `uncaughtException: ${(message || '(no error message)')}`,
        err.stack || '  No stack trace'
      ].join('\n'),
      stack: err.stack,
      exception: true,
      date: new Date().toString(),
      process: this.getProcessInfo(),
      os: this.getOsInfo(),
      trace: this.getTrace(err)
    };
  }

  /**
   * Gets all relevant process information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */
  getProcessInfo() {
    return {
      pid: process.pid,
      uid: process.getuid ? process.getuid() : null,
      gid: process.getgid ? process.getgid() : null,
      cwd: process.cwd(),
      execPath: process.execPath,
      version: process.version,
      argv: process.argv,
      memoryUsage: process.memoryUsage()
    };
  }

  /**
   * Gets all relevant OS information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */
  getOsInfo() {
    return {
      loadavg: os.loadavg(),
      uptime: os.uptime()
    };
  }

  /**
   * Gets a stack trace for the specified error.
   * @param {mixed} err - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */
  getTrace(err) {
    const trace = err ? stackTrace.parse(err) : stackTrace.get();
    return trace.map(site => {
      return {
        column: site.getColumnNumber(),
        file: site.getFileName(),
        function: site.getFunctionName(),
        line: site.getLineNumber(),
        method: site.getMethodName(),
        native: site.isNative()
      };
    });
  }

  /**
   * Helper method to add a transport as an exception handler.
   * @param {Transport} handler - The transport to add as an exception handler.
   * @returns {void}
   */
  _addHandler(handler) {
    if (!this.handlers.has(handler)) {
      handler.handleExceptions = true;
      const wrapper = new exceptionStream(handler);
      this.handlers.set(handler, wrapper);
      this.logger.pipe(wrapper);
    }
  }

  /**
   * Logs all relevant information around the `err` and exits the current
   * process.
   * @param {Error} err - Error to handle
   * @returns {mixed} - TODO: add return description.
   * @private
   */
  _uncaughtException(err) {
    const info = this.getAllInfo(err);
    const handlers = this._getExceptionHandlers();
    // Calculate if we should exit on this error
    let doExit = typeof this.logger.exitOnError === 'function'
      ? this.logger.exitOnError(err)
      : this.logger.exitOnError;
    let timeout;

    if (!handlers.length && doExit) {
      // eslint-disable-next-line no-console
      console.warn('winston: exitOnError cannot be false with no exception handlers.');
      // eslint-disable-next-line no-console
      console.warn('winston: exiting process.');
      doExit = false;
    }

    function gracefulExit() {
      debug$2('doExit', doExit);
      debug$2('process._exiting', process._exiting);

      if (doExit && !process._exiting) {
        // Remark: Currently ignoring any exceptions from transports when
        // catching uncaught exceptions.
        if (timeout) {
          clearTimeout(timeout);
        }
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      }
    }

    if (!handlers || handlers.length === 0) {
      return process.nextTick(gracefulExit);
    }

    // Log to all transports attempting to listen for when they are completed.
    forEach(handlers, (handler, next) => {
      // TODO: Change these to the correct WritableStream events so that we
      // wait until exit.
      const done = oneTime(next);
      const transport = handler.transport || handler;

      // Debug wrapping so that we can inspect what's going on under the covers.
      function onDone(event) {
        return () => {
          debug$2(event);
          done();
        };
      }

      transport.once('logged', onDone('logged'));
      transport.once('error', onDone('error'));
    }, gracefulExit);

    this.logger.log(info);

    // If exitOnError is true, then only allow the logging of exceptions to
    // take up to `3000ms`.
    if (doExit) {
      timeout = setTimeout(gracefulExit, 3000);
    }
  }

  /**
   * Returns the list of transports and exceptionHandlers for this instance.
   * @returns {Array} - List of transports and exceptionHandlers for this
   * instance.
   * @private
   */
  _getExceptionHandlers() {
    // Remark (indexzero): since `logger.transports` returns all of the pipes
    // from the _readableState of the stream we actually get the join of the
    // explicit handlers and the implicit transports with
    // `handleExceptions: true`
    return this.logger.transports.filter(wrap => {
      const transport = wrap.transport || wrap;
      return transport.handleExceptions;
    });
  }
};

var legacy = createCommonjsModule(function (module) {
'use strict';


const { LEVEL } = tripleBeam;


/**
 * Constructor function for the LegacyTransportStream. This is an internal
 * wrapper `winston >= 3` uses to wrap older transports implementing
 * log(level, message, meta).
 * @param {Object} options - Options for this TransportStream instance.
 * @param {Transpot} options.transport - winston@2 or older Transport to wrap.
 */

const LegacyTransportStream = module.exports = function LegacyTransportStream(options = {}) {
  winstonTransport.call(this, options);
  if (!options.transport || typeof options.transport.log !== 'function') {
    throw new Error('Invalid transport, must be an object with a log method.');
  }

  this.transport = options.transport;
  this.level = this.level || options.transport.level;
  this.handleExceptions = this.handleExceptions || options.transport.handleExceptions;

  // Display our deprecation notice.
  this._deprecated();

  // Properly bubble up errors from the transport to the
  // LegacyTransportStream instance, but only once no matter how many times
  // this transport is shared.
  function transportError(err) {
    this.emit('error', err, this.transport);
  }

  if (!this.transport.__winstonError) {
    this.transport.__winstonError = transportError.bind(this);
    this.transport.on('error', this.transport.__winstonError);
  }
};

/*
 * Inherit from TransportStream using Node.js built-ins
 */
util.inherits(LegacyTransportStream, winstonTransport);

/**
 * Writes the info object to our transport instance.
 * @param {mixed} info - TODO: add param description.
 * @param {mixed} enc - TODO: add param description.
 * @param {function} callback - TODO: add param description.
 * @returns {undefined}
 * @private
 */
LegacyTransportStream.prototype._write = function _write(info, enc, callback) {
  if (this.silent || (info.exception === true && !this.handleExceptions)) {
    return callback(null);
  }

  // Remark: This has to be handled in the base transport now because we
  // cannot conditionally write to our pipe targets as stream.
  if (!this.level || this.levels[this.level] >= this.levels[info[LEVEL]]) {
    this.transport.log(info[LEVEL], info.message, info, this._nop);
  }

  callback(null);
};

/**
 * Writes the batch of info objects (i.e. "object chunks") to our transport
 * instance after performing any necessary filtering.
 * @param {mixed} chunks - TODO: add params description.
 * @param {function} callback - TODO: add params description.
 * @returns {mixed} - TODO: add returns description.
 * @private
 */
LegacyTransportStream.prototype._writev = function _writev(chunks, callback) {
  for (let i = 0; i < chunks.length; i++) {
    if (this._accept(chunks[i])) {
      this.transport.log(
        chunks[i].chunk[LEVEL],
        chunks[i].chunk.message,
        chunks[i].chunk,
        this._nop
      );
      chunks[i].callback();
    }
  }

  return callback(null);
};

/**
 * Displays a deprecation notice. Defined as a function so it can be
 * overriden in tests.
 * @returns {undefined}
 */
LegacyTransportStream.prototype._deprecated = function _deprecated() {
  // eslint-disable-next-line no-console
  console.error([
    `${this.transport.name} is a legacy winston transport. Consider upgrading: `,
    '- Upgrade docs: https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md'
  ].join('\n'));
};

/**
 * Clean up error handling state on the legacy transport associated
 * with this instance.
 * @returns {undefined}
 */
LegacyTransportStream.prototype.close = function close() {
  if (this.transport.close) {
    this.transport.close();
  }

  if (this.transport.__winstonError) {
    this.transport.removeListener('error', this.transport.__winstonError);
    this.transport.__winstonError = null;
  }
};
});

/**
 * profiler.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

/**
 * TODO: add class description.
 * @type {Profiler}
 * @private
 */
var profiler = class Profiler {
  /**
   * Constructor function for the Profiler instance used by
   * `Logger.prototype.startTimer`. When done is called the timer will finish
   * and log the duration.
   * @param {!Logger} logger - TODO: add param description.
   * @private
   */
  constructor(logger) {
    if (!logger) {
      throw new Error('Logger is required for profiling.');
    }

    this.logger = logger;
    this.start = Date.now();
  }

  /**
   * Ends the current timer (i.e. Profiler) instance and logs the `msg` along
   * with the duration since creation.
   * @returns {mixed} - TODO: add return description.
   * @private
   */
  done(...args) {
    if (typeof args[args.length - 1] === 'function') {
      // eslint-disable-next-line no-console
      console.warn('Callback function no longer supported as of winston@3.0.0');
      args.pop();
    }

    const info = typeof args[args.length - 1] === 'object' ? args.pop() : {};
    info.level = info.level || 'info';
    info.durationMs = (Date.now()) - this.start;

    return this.logger.write(info);
  }
};

var fastSafeStringify = stringify;
stringify.default = stringify;
stringify.stable = deterministicStringify;
stringify.stableStringify = deterministicStringify;

var arr = [];

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined);
  var res = JSON.stringify(obj, replacer, spacer);
  while (arr.length !== 0) {
    var part = arr.pop();
    part[0][part[1]] = part[2];
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i;
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]';
        arr.push([parent, k, val]);
        return
      }
    }
    stack.push(val);
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val);
      }
    } else {
      var keys = Object.keys(val);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        decirc(val[key], key, stack, val);
      }
    }
    stack.pop();
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj;
  var res = JSON.stringify(tmp, replacer, spacer);
  while (arr.length !== 0) {
    var part = arr.pop();
    part[0][part[1]] = part[2];
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i;
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        parent[k] = '[Circular]';
        arr.push([parent, k, val]);
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val);
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val);
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {};
      var keys = Object.keys(val).sort(compareFunction);
      for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        deterministicDecirc(val[key], key, stack, val);
        tmp[key] = val[key];
      }
      if (parent !== undefined) {
        arr.push([parent, k, val]);
        parent[k] = tmp;
      } else {
        return tmp
      }
    }
    stack.pop();
  }
}

'use strict';


const { MESSAGE: MESSAGE$3 } = tripleBeam;


/*
 * function replacer (key, value)
 * Handles proper stringification of Buffer output.
 */
function replacer(key, value) {
  return value instanceof Buffer
    ? value.toString('base64')
    : value;
}

/*
 * function json (info)
 * Returns a new instance of the JSON format that turns a log `info`
 * object into pure JSON. This was previously exposed as { json: true }
 * to transports in `winston < 3.0.0`.
 */
var json = format((info, opts) => {
  info[MESSAGE$3] = fastSafeStringify(info, opts.replacer || replacer, opts.space);
  return info;
});

/**
 * logger.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';



const { LEVEL: LEVEL$1, SPLAT } = tripleBeam;




const { clone, warn } = common;


/**
 * TODO: add class description.
 * @type {Logger}
 * @extends {stream.Transform}
 */
class Logger extends readable.Transform {
  /**
   * Constructor function for the Logger object responsible for persisting log
   * messages and metadata to one or more transports.
   * @param {!Object} options - foo
   */
  constructor(options) {
    super({
      objectMode: true
    });
    this.configure(options);
  }

  /**
   * This will wholesale reconfigure this instance by:
   * 1. Resetting all transports. Older transports will be removed implicitly.
   * 2. Set all other options including levels, colors, rewriters, filters,
   *    exceptionHandlers, etc.
   * @param {!Object} options - TODO: add param description.
   * @returns {undefined}
   */
  configure({
    silent,
    format,
    levels,
    level = 'info',
    exitOnError = true,
    transports,
    colors,
    emitErrs,
    formatters,
    padLevels,
    rewriters,
    stripColors,
    exceptionHandlers
  } = {}) {
    // Reset transports if we already have them
    if (this.transports.length) {
      this.clear();
    }

    this.silent = silent;
    this.format = format || this.format || json();

    // Hoist other options onto this instance.
    this.levels = levels || this.levels || config$1.npm.levels;
    this.level = level;
    this.exceptions = new exceptionHandler(this);
    this.profilers = {};
    this.exitOnError = exitOnError;

    // Add all transports we have been provided.
    if (transports) {
      transports = Array.isArray(transports) ? transports : [transports];
      transports.forEach(transport => this.add(transport));
    }

    if (
      colors || emitErrs || formatters ||
      padLevels || rewriters || stripColors
    ) {
      throw new Error([
        '{ colors, emitErrs, formatters, padLevels, rewriters, stripColors } were removed in winston@3.0.0.',
        'Use a custom winston.format(function) instead.',
        'See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md'
      ].join('\n'));
    }

    if (exceptionHandlers) {
      this.exceptions.handle(exceptionHandlers);
    }
  }

  isLevelEnabled(level) {
    const givenLevelValue = getLevelValue(this.levels, level);
    if (givenLevelValue === null) {
      return false;
    }

    const configuredLevelValue = getLevelValue(this.levels, this.level);
    if (configuredLevelValue === null) {
      return false;
    }

    if (!this.transports || this.transports.length === 0) {
      return configuredLevelValue >= givenLevelValue;
    }

    const index = this.transports.findIndex(transport => {
      let transportLevelValue = getLevelValue(this.levels, transport.level);
      if (transportLevelValue === null) {
        transportLevelValue = configuredLevelValue;
      }
      return transportLevelValue >= givenLevelValue;
    });
    return index !== -1;
  }

  /* eslint-disable valid-jsdoc */
  /**
   * Ensure backwards compatibility with a `log` method
   * @param {mixed} level - Level the log message is written at.
   * @param {mixed} msg - TODO: add param description.
   * @param {mixed} meta - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   *
   * @example
   *    // Supports the existing API:
   *    logger.log('info', 'Hello world', { custom: true });
   *    logger.log('info', new Error('Yo, it\'s on fire'));
   *    logger.log('info', '%s %d%%', 'A string', 50, { thisIsMeta: true });
   *
   *    // And the new API with a single JSON literal:
   *    logger.log({ level: 'info', message: 'Hello world', custom: true });
   *    logger.log({ level: 'info', message: new Error('Yo, it\'s on fire') });
   *    logger.log({
   *      level: 'info',
   *      message: '%s %d%%',
   *      [SPLAT]: ['A string', 50],
   *      meta: { thisIsMeta: true }
   *    });
   *
   */
  /* eslint-enable valid-jsdoc */
  log(level, msg, ...splat) { // eslint-disable-line max-params
    // Optimize for the hotpath of logging JSON literals
    if (arguments.length === 1) {
      // Yo dawg, I heard you like levels ... seriously ...
      // In this context the LHS `level` here is actually the `info` so read
      // this as: info[LEVEL] = info.level;
      level[LEVEL$1] = level.level;
      this.write(level);
      return this;
    }

    // Slightly less hotpath, but worth optimizing for.
    if (arguments.length === 2) {
      if (msg && typeof msg === 'object') {
        msg[LEVEL$1] = msg.level = level;
        this.write(msg);
        return this;
      }

      this.write({ [LEVEL$1]: level, level, message: msg });
      return this;
    }

    const [meta] = splat;
    if (typeof meta === 'object' && meta !== null) {
      this.write(Object.assign({}, meta, {
        [LEVEL$1]: level,
        [SPLAT]: splat.slice(0),
        level,
        message: msg
      }));
    } else {
      this.write(Object.assign({}, {
        [LEVEL$1]: level,
        [SPLAT]: splat,
        level,
        message: msg
      }));
    }

    return this;
  }

  /**
   * Pushes data so that it can be picked up by all of our pipe targets.
   * @param {mixed} info - TODO: add param description.
   * @param {mixed} enc - TODO: add param description.
   * @param {mixed} callback - Continues stream processing.
   * @returns {undefined}
   * @private
   */
  _transform(info, enc, callback) {
    if (this.silent) {
      return callback();
    }

    // [LEVEL] is only soft guaranteed to be set here since we are a proper
    // stream. It is likely that `info` came in through `.log(info)` or
    // `.info(info)`. If it is not defined, however, define it.
    // This LEVEL symbol is provided by `triple-beam` and also used in:
    // - logform
    // - winston-transport
    // - abstract-winston-transport
    if (!info[LEVEL$1]) {
      info[LEVEL$1] = info.level;
    }

    // Remark: really not sure what to do here, but this has been reported as
    // very confusing by pre winston@2.0.0 users as quite confusing when using
    // custom levels.
    if (!this.levels[info[LEVEL$1]] && this.levels[info[LEVEL$1]] !== 0) {
      // eslint-disable-next-line no-console
      console.error('[winston] Unknown logger level: %s', info[LEVEL$1]);
    }

    // Remark: not sure if we should simply error here.
    if (!this._readableState.pipes) {
      // eslint-disable-next-line no-console
      console.error('[winston] Attempt to write logs with no transports %j', info);
    }

    // Here we write to the `format` pipe-chain, which on `readable` above will
    // push the formatted `info` Object onto the buffer for this instance. We trap
    // (and re-throw) any errors generated by the user-provided format, but also
    // guarantee that the streams callback is invoked so that we can continue flowing.
    try {
      this.push(this.format.transform(info, this.format.options));
    } catch (ex) {
      throw ex;
    } finally {
      // eslint-disable-next-line callback-return
      callback();
    }
  }

  /**
   * Delays the 'finish' event until all transport pipe targets have
   * also emitted 'finish' or are already finished.
   * @param {mixed} callback - Continues stream processing.
   */
  _final(callback) {
    const transports = this.transports.slice();
    forEach(transports, (transport, next) => {
      if (!transport || transport.finished) return setImmediate(next);
      transport.once('finish', next);
      transport.end();
    }, callback);
  }

  /**
   * Adds the transport to this logger instance by piping to it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */
  add(transport) {
    // Support backwards compatibility with all existing `winston < 3.x.x`
    // transports which meet one of two criteria:
    // 1. They inherit from winston.Transport in  < 3.x.x which is NOT a stream.
    // 2. They expose a log method which has a length greater than 2 (i.e. more then
    //    just `log(info, callback)`.
    const target = !isStream_1(transport) || transport.log.length > 2
      ? new legacy({ transport })
      : transport;

    if (!target._writableState || !target._writableState.objectMode) {
      throw new Error('Transports must WritableStreams in objectMode. Set { objectMode: true }.');
    }

    // Listen for the `error` event on the new Transport.
    this._onError(target);
    this.pipe(target);

    if (transport.handleExceptions) {
      this.exceptions.handle();
    }

    return this;
  }

  /**
   * Removes the transport from this logger instance by unpiping from it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */
  remove(transport) {
    let target = transport;
    if (!isStream_1(transport) || transport.log.length > 2) {
      target = this.transports
        .filter(match => match.transport === transport)[0];
    }

    if (target) { this.unpipe(target); }
    return this;
  }

  /**
   * Removes all transports from this logger instance.
   * @returns {Logger} - TODO: add return description.
   */
  clear() {
    this.unpipe();
    return this;
  }

  /**
   * Cleans up resources (streams, event listeners) for all transports
   * associated with this instance (if necessary).
   * @returns {Logger} - TODO: add return description.
   */
  close() {
    this.clear();
    this.emit('close');
    return this;
  }

  /**
   * Sets the `target` levels specified on this instance.
   * @param {Object} Target levels to use on this instance.
   */
  setLevels() {
    warn.deprecated('setLevels');
  }

  /**
   * Queries the all transports for this instance with the specified `options`.
   * This will aggregate each transport's results into one object containing
   * a property per transport.
   * @param {Object} options - Query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * @retruns {mixed} - TODO: add return description.
   */
  query(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    options = options || {};
    const results = {};
    const queryObject = clone(options.query) || {};

    // Helper function to query a single transport
    function queryTransport(transport, next) {
      if (options.query) {
        options.query = transport.formatQuery(queryObject);
      }

      transport.query(options, (err, res) => {
        if (err) {
          return next(err);
        }

        next(null, transport.formatResults(res, options.format));
      });
    }

    // Helper function to accumulate the results from `queryTransport` into
    // the `results`.
    function addResults(transport, next) {
      queryTransport(transport, (err, result) => {
        // queryTransport could potentially invoke the callback multiple times
        // since Transport code can be unpredictable.
        if (next) {
          result = err || result;
          if (result) {
            results[transport.name] = result;
          }

          // eslint-disable-next-line callback-return
          next();
        }

        next = null;
      });
    }

    // Iterate over the transports in parallel setting the appropriate key in
    // the `results`.
    forEach(
      this.transports.filter(transport => !!transport.query),
      addResults,
      () => callback(null, results)
    );
  }

  /**
   * Returns a log stream for all transports. Options object is optional.
   * @param{Object} options={} - Stream options for this instance.
   * @returns {Stream} - TODO: add return description.
   */
  stream(options = {}) {
    const out = new readable.Stream();
    const streams = [];

    out._streams = streams;
    out.destroy = () => {
      let i = streams.length;
      while (i--) {
        streams[i].destroy();
      }
    };

    // Create a list of all transports for this instance.
    this.transports
      .filter(transport => !!transport.stream)
      .forEach(transport => {
        const str = transport.stream(options);
        if (!str) {
          return;
        }

        streams.push(str);

        str.on('log', log => {
          log.transport = log.transport || [];
          log.transport.push(transport.name);
          out.emit('log', log);
        });

        str.on('error', err => {
          err.transport = err.transport || [];
          err.transport.push(transport.name);
          out.emit('error', err);
        });
      });

    return out;
  }

  /**
   * Returns an object corresponding to a specific timing. When done is called
   * the timer will finish and log the duration. e.g.:
   * @returns {Profile} - TODO: add return description.
   * @example
   *    const timer = winston.startTimer()
   *    setTimeout(() => {
   *      timer.done({
   *        message: 'Logging message'
   *      });
   *    }, 1000);
   */
  startTimer() {
    return new profiler(this);
  }

  /**
   * Tracks the time inbetween subsequent calls to this method with the same
   * `id` parameter. The second call to this method will log the difference in
   * milliseconds along with the message.
   * @param {string} id Unique id of the profiler
   * @returns {Logger} - TODO: add return description.
   */
  profile(id, ...args) {
    const time = Date.now();
    if (this.profilers[id]) {
      const timeEnd = this.profilers[id];
      delete this.profilers[id];

      // Attempt to be kind to users if they are still using older APIs.
      if (typeof args[args.length - 2] === 'function') {
        // eslint-disable-next-line no-console
        console.warn('Callback function no longer supported as of winston@3.0.0');
        args.pop();
      }

      // Set the duration property of the metadata
      const info = typeof args[args.length - 1] === 'object' ? args.pop() : {};
      info.level = info.level || 'info';
      info.durationMs = time - timeEnd;
      info.message = info.message || id;
      return this.write(info);
    }

    this.profilers[id] = time;
    return this;
  }

  /**
   * Backwards compatibility to `exceptions.handle` in winston < 3.0.0.
   * @returns {undefined}
   * @deprecated
   */
  handleExceptions(...args) {
    // eslint-disable-next-line no-console
    console.warn('Deprecated: .handleExceptions() will be removed in winston@4. Use .exceptions.handle()');
    this.exceptions.handle(...args);
  }

  /**
   * Backwards compatibility to `exceptions.handle` in winston < 3.0.0.
   * @returns {undefined}
   * @deprecated
   */
  unhandleExceptions(...args) {
    // eslint-disable-next-line no-console
    console.warn('Deprecated: .unhandleExceptions() will be removed in winston@4. Use .exceptions.unhandle()');
    this.exceptions.unhandle(...args);
  }

  /**
   * Throw a more meaningful deprecation notice
   * @throws {Error} - TODO: add throws description.
   */
  cli() {
    throw new Error([
      'Logger.cli() was removed in winston@3.0.0',
      'Use a custom winston.formats.cli() instead.',
      'See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md'
    ].join('\n'));
  }

  /**
   * Bubbles the error, `err`, that occured on the specified `transport` up
   * from this instance if `emitErrs` has been set.
   * @param {Object} transport - Transport on which the error occured
   * @throws {Error} - Error that occurred on the transport
   * @private
   */
  _onError(transport) {
    function transportError(err) {
      this.emit('error', err, transport);
    }

    if (!transport.__winstonError) {
      transport.__winstonError = transportError.bind(this);
      transport.on('error', transport.__winstonError);
    }
  }
}

function getLevelValue(levels, level) {
  const value = levels[level];
  if (!value && value !== 0) {
    return null;
  }
  return value;
}

/**
 * Represents the current readableState pipe targets for this Logger instance.
 * @type {Array|Object}
 */
Object.defineProperty(Logger.prototype, 'transports', {
  configurable: false,
  enumerable: true,
  get() {
    const { pipes } = this._readableState;
    return !Array.isArray(pipes) ? [pipes].filter(Boolean) : pipes;
  }
});

var logger = Logger;

/**
 * create-logger.js: Logger factory for winston logger instances.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

const { LEVEL: LEVEL$2 } = tripleBeam;


const debug$3 = diagnostics('winston:create-logger');

/**
 * DerivedLogger to attach the logs level methods.
 * @type {DerivedLogger}
 * @extends {Logger}
 */
class DerivedLogger extends logger {
  /**
   * Create a new class derived logger for which the levels can be attached to
   * the prototype of. This is a V8 optimization that is well know to increase
   * performance of prototype functions.
   * @param {!Object} options - Options for the created logger.
   */
  constructor(options) {
    super(options);
    this._setupLevels();
  }

  /**
   * Create the log level methods for the derived logger.
   * @returns {undefined}
   * @private
   */
  _setupLevels() {
    Object.keys(this.levels).forEach(level => {
      debug$3('Define prototype method for "%s"', level);
      if (level === 'log') {
        // eslint-disable-next-line no-console
        console.warn('Level "log" not defined: conflicts with the method "log". Use a different level name.');
        return;
      }

      // Define prototype methods for each log level
      // e.g. logger.log('info', msg) <––> logger.info(msg) & logger.isInfoEnabled()
      this[level] = (...args) => {
        // Optimize the hot-path which is the single object.
        if (args.length === 1) {
          const [msg] = args;
          const info = msg && msg.message && msg || { message: msg };
          info.level = info[LEVEL$2] = level;
          this.write(info);
          return this;
        }

        // Otherwise build argument list which could potentially conform to
        // either:
        // . v3 API: log(obj)
        // 2. v1/v2 API: log(level, msg, ... [string interpolate], [{metadata}], [callback])
        return this.log(level, ...args);
      };

      this[isLevelEnabledFunctionName(level)] = () => this.isLevelEnabled(level);
    });
  }
}

function isLevelEnabledFunctionName(level) {
  return 'is' + level.charAt(0).toUpperCase() + level.slice(1) + 'Enabled';
}

/**
 * Create a new instance of a winston Logger. Creates a new
 * prototype for each instance.
 * @param {!Object} opts - Options for the created logger.
 * @returns {Logger} - A newly created logger instance.
 */
var createLogger = (opts = { levels: config$1.npm.levels }) => (
  new DerivedLogger(opts)
);

/**
 * container.js: Inversion of control container for winston logger instances.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';



/**
 * Inversion of control container for winston logger instances.
 * @type {Container}
 */
var container = class Container {
  /**
   * Constructor function for the Container object responsible for managing a
   * set of `winston.Logger` instances based on string ids.
   * @param {!Object} [options={}] - Default pass-thru options for Loggers.
   */
  constructor(options = {}) {
    this.loggers = new Map();
    this.options = options;
  }

  /**
   * Retreives a `winston.Logger` instance for the specified `id`. If an
   * instance does not exist, one is created.
   * @param {!string} id - The id of the Logger to get.
   * @param {?Object} [options] - Options for the Logger instance.
   * @returns {Logger} - A configured Logger instance with a specified id.
   */
  add(id, options) {
    if (!this.loggers.has(id)) {
      // Remark: Simple shallow clone for configuration options in case we pass
      // in instantiated protoypal objects
      options = Object.assign({}, options || this.options);
      const existing = options.transports || this.options.transports;

      // Remark: Make sure if we have an array of transports we slice it to
      // make copies of those references.
      options.transports = existing ? existing.slice() : [];

      const logger = createLogger(options);
      logger.on('close', () => this._delete(id));
      this.loggers.set(id, logger);
    }

    return this.loggers.get(id);
  }

  /**
   * Retreives a `winston.Logger` instance for the specified `id`. If
   * an instance does not exist, one is created.
   * @param {!string} id - The id of the Logger to get.
   * @param {?Object} [options] - Options for the Logger instance.
   * @returns {Logger} - A configured Logger instance with a specified id.
   */
  get(id, options) {
    return this.add(id, options);
  }

  /**
   * Check if the container has a logger with the id.
   * @param {?string} id - The id of the Logger instance to find.
   * @returns {boolean} - Boolean value indicating if this instance has a
   * logger with the specified `id`.
   */
  has(id) {
    return !!this.loggers.has(id);
  }

  /**
   * Closes a `Logger` instance with the specified `id` if it exists.
   * If no `id` is supplied then all Loggers are closed.
   * @param {?string} id - The id of the Logger instance to close.
   * @returns {undefined}
   */
  close(id) {
    if (id) {
      return this._removeLogger(id);
    }

    this.loggers.forEach((val, key) => this._removeLogger(key));
  }

  /**
   * Remove a logger based on the id.
   * @param {!string} id - The id of the logger to remove.
   * @returns {undefined}
   * @private
   */
  _removeLogger(id) {
    if (!this.loggers.has(id)) {
      return;
    }

    const logger = this.loggers.get(id);
    logger.close();
    this._delete(id);
  }

  /**
   * Deletes a `Logger` instance with the specified `id`.
   * @param {!string} id - The id of the Logger instance to delete from
   * container.
   * @returns {undefined}
   * @private
   */
  _delete(id) {
    this.loggers.delete(id);
  }
};

var require$$1 = getCjsExportFromNamespace(_package$1);

var winston_1 = createCommonjsModule(function (module, exports) {
/**
 * winston.js: Top-level include defining Winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';


const { warn } = common;

/**
 * Setup to expose.
 * @type {Object}
 */
const winston = exports;

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */
winston.version = require$$1.version;
/**
 * Include transports defined by default by winston
 * @type {Array}
 */
winston.transports = transports;
/**
 * Expose utility methods
 * @type {Object}
 */
winston.config = config$1;
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
winston.addColors = logform.levels;
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */
winston.format = logform.format;
/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */
winston.createLogger = createLogger;
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
winston.ExceptionHandler = exceptionHandler;
/**
 * Expose core Logging-related prototypes.
 * @type {Container}
 */
winston.Container = container;
/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */
winston.Transport = winstonTransport;
/**
 * We create and expose a default `Container` to `winston.loggers` so that the
 * programmer may manage multiple `winston.Logger` instances without any
 * additional overhead.
 * @example
 *   // some-file1.js
 *   const logger = require('winston').loggers.get('something');
 *
 *   // some-file2.js
 *   const logger = require('winston').loggers.get('something');
 */
winston.loggers = new winston.Container();

/**
 * We create and expose a 'defaultLogger' so that the programmer may do the
 * following without the need to create an instance of winston.Logger directly:
 * @example
 *   const winston = require('winston');
 *   winston.log('info', 'some message');
 *   winston.error('some error');
 */
const defaultLogger = winston.createLogger();

// Pass through the target methods onto `winston.
Object.keys(winston.config.npm.levels).concat([
  'log',
  'query',
  'stream',
  'add',
  'remove',
  'clear',
  'profile',
  'startTimer',
  'handleExceptions',
  'unhandleExceptions',
  'configure'
]).forEach(method => (
  winston[method] = (...args) => defaultLogger[method](...args)
));

/**
 * Define getter / setter for the default logger level which need to be exposed
 * by winston.
 * @type {string}
 */
Object.defineProperty(winston, 'level', {
  get() {
    return defaultLogger.level;
  },
  set(val) {
    defaultLogger.level = val;
  }
});

/**
 * Define getter for `exceptions` which replaces `handleExceptions` and
 * `unhandleExceptions`.
 * @type {Object}
 */
Object.defineProperty(winston, 'exceptions', {
  get() {
    return defaultLogger.exceptions;
  }
});

/**
 * Define getters / setters for appropriate properties of the default logger
 * which need to be exposed by winston.
 * @type {Logger}
 */
[
  'exitOnError'
].forEach(prop => {
  Object.defineProperty(winston, prop, {
    get() {
      return defaultLogger[prop];
    },
    set(val) {
      defaultLogger[prop] = val;
    }
  });
});

/**
 * The default transports and exceptionHandlers for the default winston logger.
 * @type {Object}
 */
Object.defineProperty(winston, 'default', {
  get() {
    return {
      exceptionHandlers: defaultLogger.exceptionHandlers,
      transports: defaultLogger.transports
    };
  }
});

// Have friendlier breakage notices for properties that were exposed by default
// on winston < 3.0.
warn.deprecated(winston, 'setLevels');
warn.forFunctions(winston,  'useFormat',  ['cli']);
warn.forProperties(winston, 'useFormat',  [
  'padLevels',
  'stripColors'
]);
warn.forFunctions(winston,  'deprecated', [
  'addRewriter',
  'addFilter',
  'clone',
  'extend'
]);
warn.forProperties(winston, 'deprecated', [
  'emitErrs',
  'levelLength'
]);
// Throw a useful error when users attempt to run `new winston.Logger`.
warn.moved(winston, 'createLogger', 'Logger');
});

var winston_1$1 = {
  winston: winston_1
};
var winston_2 = winston_1$1.winston;

exports.default = winston_1$1;
exports.winston = winston_2;
