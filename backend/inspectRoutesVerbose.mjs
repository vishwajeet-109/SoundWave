import app from './app.js';

console.log('APP_TYPE', app.constructor.name);
console.log('HAS__ROUTER', app.hasOwnProperty('_router'));
console.log('HAS_ROUTER', app.hasOwnProperty('router'));
console.log('_router', app._router);
console.log('router', app.router);
console.log('router_type', typeof app.router);
if (app.router) {
  try {
    console.log('router_keys', Object.getOwnPropertyNames(app.router));
    console.log('router_stack_len', app.router.stack?.length);
    console.log('router_stack_keys', app.router.stack?.map((l, i) => `${i}:${l.name}:${l.regexp?.source}`));
  } catch (e) {
    console.error('router inspect error', e);
  }
}
if (app._router) {
  try {
    console.log('_router_keys', Object.getOwnPropertyNames(app._router));
    console.log('_router_stack_len', app._router.stack?.length);
  } catch (e) {
    console.error('_router inspect error', e);
  }
}
