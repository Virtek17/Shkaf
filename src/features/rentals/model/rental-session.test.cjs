const { test } = require('node:test');
const assert = require('node:assert/strict');
const { rentalSessionsReducer: reduce, resolveRental } = require('./rental-session.ts');
const { getRentalPeriod } = require('../constants/rental-options.ts');
const { formatCountdown } = require('./format.ts');
const { createPreviewSession } = require('../dev/preview-session.ts');

const product = () => ({ id: 'product', displayCode: 'ID_TEST', name: 'Дрель', pricePerHour: 150, photo: {uri:'test'},
  status: 'available', description: 'Описание', included: ['Дрель', 'Кейс'], condition: { label: 'Хорошее' },
  pickupPoint: { name: 'Университет', address: '1 этаж' } });
const start = (period = 'hour', rentalId = 'one', item = product()) => reduce({}, { type: 'START', rentalId, product: item, period, agreed: true });
function event(state, type, fields = {}) { return reduce(state, { type, rentalId: 'one', now: 10, ...fields }); }
const payment = () => event(start(), 'AVAILABILITY_CONFIRMED', { revision: 0, available: true, expiresAt: 100 });
const pickup = () => event(event(payment(), 'PAYMENT_REQUESTED'), 'PAYMENT_CONFIRMED', { revision: 2 });
const kit = () => event(event(pickup(), 'LOCKER_OPEN_REQUESTED'), 'LOCKER_OPENED', { revision: 4 });

test('consent required; repeated START cannot create a duplicate session', () => {
  assert.deepEqual(reduce({}, {type:'START',rentalId:'one',product:product(),period:'hour',agreed:false}), {});
  const state = start();
  assert.equal(event(state, 'START', {product:product(),period:'day',agreed:true,rentalId:'two'}), state);
  assert.equal(event(state, 'KIT_CONFIRMED'), state);
});
test('price units and periods: hourly rubles, no implicit discounts', () => {
  for (const period of ['hour','three-hours','day']) assert.equal(start(period).one.total, 150 * getRentalPeriod(period).hours);
  assert.equal(formatCountdown(-1),'00:00');
  assert.equal(formatCountdown(1001),'00:02');
});
test('unavailable product and request failure are explicit outcomes', () => {
  const state = start();
  assert.equal(event(state,'AVAILABILITY_CONFIRMED',{revision:0,available:false,expiresAt:100}).one.stage,'unavailable');
  assert.ok(event(state,'AVAILABILITY_FAILED',{revision:0}).one.operationError);
});
test('deadline boundary, background resume and late payment result', () => {
  const state = payment();
  assert.equal(reduce(state,{type:'EXPIRE',now:99}), state);
  const expired=reduce(state,{type:'EXPIRE',now:100});
  assert.equal(expired.one.stage,'expired');
  assert.equal(reduce(state,{type:'EXPIRE',now:10000}).one.stage,'expired');
  const paying=event(state,'PAYMENT_REQUESTED');
  assert.equal(event(paying,'PAYMENT_CONFIRMED',{revision:2,now:100}).one.stage,'expired');
  assert.equal(event(expired,'PAYMENT_CONFIRMED',{revision:2,now:101}),expired);
});
test('complete flow: payment, pickup, kit gate, active receipt', () => {
  let state=kit();
  assert.equal(state.one.stage,'kit');
  assert.equal(state.one.expiresAt,undefined);
  assert.equal(event(state,'KIT_CONFIRMED'),state);
  assert.equal(event(state,'KIT_TOGGLED',{index:99}),state);
  state=event(state,'KIT_TOGGLED',{index:0});
  assert.equal(event(state,'KIT_CONFIRMED'),state);
  state=event(state,'KIT_TOGGLED',{index:1});
  state=event(state,'KIT_CONFIRMED',{now:50});
  assert.equal(state.one.stage,'active');
  assert.equal(state.one.startedAt,50);
  assert.equal(event(state,'PAYMENT_REQUESTED'),state);
  assert.equal(reduce(state,{type:'EXPIRE',now:10000}),state);
});
test('repeated button press, payment failure/retry and stale attempt response', () => {
  let state=event(payment(),'PAYMENT_REQUESTED');
  assert.equal(event(state,'PAYMENT_REQUESTED'),state);
  state=event(state,'PAYMENT_FAILED',{revision:2});
  assert.equal(state.one.stage,'payment-error');
  state=event(state,'PAYMENT_RETRY');
  state=event(state,'PAYMENT_REQUESTED');
  assert.equal(event(state,'PAYMENT_CONFIRMED',{revision:2}),state);
  assert.equal(event(state,'PAYMENT_CONFIRMED',{revision:state.one.revision}).one.stage,'pickup');
});
test('lock failure/retry and stale completion', () => {
  let state=event(pickup(),'LOCKER_OPEN_REQUESTED');
  assert.equal(event(state,'LOCKER_OPEN_REQUESTED'),state);
  state=event(state,'LOCKER_OPEN_FAILED',{revision:4});
  assert.equal(state.one.stage,'locker-error');
  state=event(state,'LOCKER_OPEN_REQUESTED');
  assert.equal(event(state,'LOCKER_OPENED',{revision:4}),state);
  assert.equal(event(state,'LOCKER_OPENED',{revision:state.one.revision}).one.stage,'kit');
});
test('problem returns to origin, pickup deadline cannot be bypassed', () => {
  let state=event(pickup(),'PROBLEM_OPENED');
  assert.equal(state.one.problemReturnStage,'pickup');
  assert.equal(event(state,'PROBLEM_CLOSED').one.stage,'pickup');
  assert.equal(event(state,'PROBLEM_CLOSED',{now:100}).one.stage,'expired');
  state=event(state,'PROBLEM_PREPARED');
  assert.equal(state.one.stage,'problem-sent');
  assert.equal(reduce(state,{type:'EXPIRE',now:101}).one.stage,'expired');
  state=event(kit(),'PROBLEM_OPENED');
  state=event(state,'PROBLEM_CHANGED',{description:'x'.repeat(1100)});
  assert.equal(state.one.problemDescription.length,1000);
  state=event(state,'PROBLEM_PREPARED');
  state=event(state,'PROBLEM_EDITED');
  assert.equal(event(state,'PROBLEM_CLOSED').one.stage,'kit');
});
test('new attempt retains old rental; legacy product URL and exact session query', () => {
  let state=reduce(payment(),{type:'EXPIRE',now:100});
  state=reduce(state,{type:'START',rentalId:'two',product:product(),period:'day',agreed:true});
  assert.equal(Object.keys(state).length,2);
  assert.equal(resolveRental(state,'product').rentalId,'two');
  assert.equal(resolveRental(state,'product','one').stage,'expired');
  assert.equal(resolveRental(state,'other','one'),undefined);
  assert.equal(resolveRental(state,'product','missing'),undefined);
  assert.equal(event(state,'RECHECK'),state);
});
test('agreed product details are a snapshot independent of catalog mutation', () => {
  const item=product(), state=start('hour','one',item);
  item.pricePerHour=1; item.included.push('Изменение'); item.pickupPoint.name='Другое'; item.photo.uri='other';
  assert.equal(state.one.total,150);
  assert.deepEqual(state.one.product.included,['Дрель','Кейс']);
  assert.equal(state.one.product.pickupPoint.name,'Университет');
  assert.equal(state.one.product.photo.uri,'test');
});
test('demo preview can be manipulated without touching working state', () => {
  const state=payment();
  let preview={preview:createPreviewSession(state.one,'kit',10)};
  preview=reduce(preview,{type:'KIT_TOGGLED',rentalId:'preview',index:0,now:10});
  assert.deepEqual(state.one.checked,[]);
  assert.equal(state.one.stage,'payment');
  assert.deepEqual(preview.preview.checked,[0]);
});
test('unknown ids and invalid period do not mutate the state', () => {
  const state=start();
  assert.equal(event(state,'PAYMENT_REQUESTED',{rentalId:'missing'}),state);
  assert.deepEqual(start('invalid'),{});
  assert.equal(resolveRental(state,''),undefined);
});
test('support during opening cancels the old result and returns to pickup', () => {
  const opening=event(pickup(),'LOCKER_OPEN_REQUESTED');
  const problem=event(opening,'PROBLEM_OPENED');
  assert.equal(problem.one.stage,'problem');
  assert.equal(event(problem,'LOCKER_OPENED',{revision:opening.one.revision}),problem);
  assert.equal(event(problem,'PROBLEM_CLOSED').one.stage,'pickup');
});

