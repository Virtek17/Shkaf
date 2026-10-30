const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createDemoRentalService } = require('./rental-service.ts');
const { rentalSessionsReducer: reduce } = require('../model/rental-session.ts');
const repository = { async find(id) { return id === 'available' ? { status:'available' } : { status:'rented' }; } };
test('demo service contract: availability, absolute expiry and abort', async () => {
  const service=createDemoRentalService(repository,{delay:0,now:()=>123});
  const controller=new AbortController();
  assert.deepEqual(await service.checkAvailability('available',controller.signal),{available:true,expiresAt:600123});
  assert.equal((await service.checkAvailability('rented',controller.signal)).available,false);
  await service.pay({},controller.signal);
  await service.openLocker({},controller.signal);
  const pending=service.openLocker({},controller.signal);
  controller.abort();
  await assert.rejects(pending);
});
test('integration: source → reserve → pay → open → confirm kit', async () => {
  const product={id:'available',displayCode:'ID_TEST',name:'Тест',pricePerHour:150,photo:1,status:'available',
    description:'',included:['Вещь'],condition:{label:'Хорошее'},pickupPoint:{name:'Пункт',address:'1'}};
  const service=createDemoRentalService(repository,{delay:0,now:()=>0});
  const signal=new AbortController().signal;
  let state=reduce({},{type:'START',rentalId:'rental',product,period:'three-hours',agreed:true});
  const send=(type,fields={})=>{state=reduce(state,{type,rentalId:'rental',now:1,...fields});};
  send('AVAILABILITY_CONFIRMED',{revision:0,...await service.checkAvailability(product.id,signal)});
  send('PAYMENT_REQUESTED');
  await service.pay(state.rental,signal);
  send('PAYMENT_CONFIRMED',{revision:state.rental.revision});
  send('LOCKER_OPEN_REQUESTED');
  await service.openLocker(state.rental,signal);
  send('LOCKER_OPENED',{revision:state.rental.revision});
  send('KIT_TOGGLED',{index:0});
  send('KIT_CONFIRMED');
  assert.equal(state.rental.stage,'active');
  assert.equal(state.rental.total,450);
});

