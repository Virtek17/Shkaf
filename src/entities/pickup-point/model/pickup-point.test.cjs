const { test } = require('node:test');
const assert = require('node:assert/strict');
const { filterPickupPoints } = require('./pickup-point.ts');
const { demoPickupPointRepository } = require('../mocks/pickup-point-repository.ts');
test('point search matches name/address, trims input and normalizes Cyrillic', () => {
 const points = [{name:'Университет',address:'Первый этаж'}, {name:'Библиотека',address:'Зелёная улица'}];
 assert.deepEqual(filterPickupPoints(points,' УНИВЕРСИТЕТ '), [points[0]]);
 assert.deepEqual(filterPickupPoints(points,'зеленая'), [points[1]]);
 assert.deepEqual(filterPickupPoints(points,'нет'), []);
 assert.deepEqual(filterPickupPoints(points,''), points);
});
test('demo repository isolates mutations and respects cancellation', async () => {
 const points = await demoPickupPointRepository.list();
 points[0].name = 'Changed';
 assert.equal((await demoPickupPointRepository.list())[0].name, 'Университет');
 const controller = new AbortController(); controller.abort();
 await assert.rejects(demoPickupPointRepository.list(controller.signal));
});
