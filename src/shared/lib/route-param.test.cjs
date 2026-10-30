const { test } = require('node:test');
const assert = require('node:assert/strict');
const { routeParam } = require('./route-param.ts');

test('route parameters reject missing, empty, array and non-string values', () => {
  for (const value of [undefined, null, '', [], ['one'], ['one','two'], 123]) assert.equal(routeParam(value),undefined);
  assert.equal(routeParam('public-id'),'public-id');
});
