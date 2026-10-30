const { test } = require('node:test');
const assert = require('node:assert/strict');
const { apiRequest } = require('./client.ts');

async function withTransport(run) {
  const previousFetch=global.fetch;
  const previousUrl=process.env.EXPO_PUBLIC_API_URL;
  process.env.EXPO_PUBLIC_API_URL='https://example.invalid/';
  try { await run(); }
  finally {
    global.fetch=previousFetch;
    if(previousUrl===undefined) delete process.env.EXPO_PUBLIC_API_URL;
    else process.env.EXPO_PUBLIC_API_URL=previousUrl;
  }
}
test('transport merges Headers and preserves AbortSignal; supports empty response', () => withTransport(async () => {
  const signal=new AbortController().signal;
  global.fetch=async (url,options) => {
    assert.equal(url,'https://example.invalid/test');
    assert.equal(options.signal,signal);
    assert.equal(options.headers.get('X-Test'),'yes');
    assert.equal(options.headers.get('Accept'),'application/json');
    return new Response(null,{status:204});
  };
  assert.equal(await apiRequest('/test',{signal,headers:new Headers({'X-Test':'yes'})}),undefined);
}));
test('expected HTTP and connection errors expose safe categories', () => withTransport(async () => {
  global.fetch=async () => new Response('private server text',{status:500});
  await assert.rejects(apiRequest('/test'), error => error.category==='http' && error.status===500 && !error.message.includes('private'));
  global.fetch=async () => { throw new Error('private transport details'); };
  await assert.rejects(apiRequest('/test'), error => error.category==='network' && !error.message.includes('private'));
}));
test('invalid configuration does not start a request; cancellation is preserved', () => withTransport(async () => {
  delete process.env.EXPO_PUBLIC_API_URL;
  global.fetch=async () => { throw new Error('must not be called'); };
  await assert.rejects(apiRequest('/test'), error => error.category==='configuration');
  process.env.EXPO_PUBLIC_API_URL='https://example.invalid';
  const controller=new AbortController(); controller.abort();
  global.fetch=async () => { throw controller.signal.reason; };
  await assert.rejects(apiRequest('/test',{signal:controller.signal}), error => error===controller.signal.reason);
}));
