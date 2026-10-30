// Use installed TypeScript with node:test; no additional runtime or test dependencies.
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = function(module, filename) {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }), filename);
};

