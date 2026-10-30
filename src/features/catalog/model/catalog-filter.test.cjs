const { test } = require('node:test');
const assert = require('node:assert/strict');
const { filterProducts, productRows } = require('./catalog-filter.ts');

const products = [
  { id: '1', name: 'Шуруповёрт', category: 'technology' },
  { id: '2', name: 'Настольная игра', category: 'leisure' },
  { id: '3', name: 'Проектор', category: 'technology' },
];
test('categories filter products without changing their order or source', () => {
  assert.deepEqual(filterProducts(products, 'all', ''), products);
  assert.deepEqual(filterProducts(products, 'technology', '').map(p => p.id), ['1', '3']);
  assert.deepEqual(filterProducts(products, 'leisure', '').map(p => p.id), ['2']);
  assert.equal(products.length, 3);
});
test('search combines with category, trims spaces and matches Cyrillic case and е/ё', () => {
  assert.deepEqual(filterProducts(products, 'technology', '  ШУРУПОВЕРТ ').map(p => p.id), ['1']);
  assert.deepEqual(filterProducts(products, 'leisure', 'проектор'), []);
  assert.deepEqual(filterProducts(products, 'all', 'неизвестный товар'), []);
});
test('two-column rows retain every product, including an odd final item', () => {
  assert.deepEqual(productRows(products), [[products[0], products[1]], [products[2]]]);
  assert.deepEqual(productRows([]), []);
});

test('point selection intersects with search/category and unknown points stay empty', () => {
 const items = [{id:'1',name:'Игра',category:'leisure',pickupPointId:'library'}, {id:'2',name:'Дрель',category:'technology',pickupPointId:'university'}];
 assert.deepEqual(filterProducts(items,'all','','library'), [items[0]]);
 assert.deepEqual(filterProducts(items,'technology','','library'), []);
 assert.deepEqual(filterProducts(items,'all','дрель','library'), []);
 assert.deepEqual(filterProducts(items,'all','','missing'), []);
 assert.deepEqual(filterProducts(items,'all',''), items);
});
