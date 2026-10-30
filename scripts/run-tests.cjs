const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const tests = walk(path.join(root, 'src')).filter(file => file.endsWith('.test.cjs'));
if (!tests.length) throw new Error('No tests found');
const result = spawnSync(process.execPath, ['--require', path.join(__dirname, 'test-register.cjs'), '--test', ...tests], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
