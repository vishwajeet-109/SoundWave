import app from './app.js';

console.log('APP_TYPE', app?.constructor?.name);
console.log('USE', typeof app.use);
console.log('ROUTER_prop', app.router);
console.log('ROUTER_type', typeof app.router);
console.log('_router', app._router);
console.log('router.stack', app.router?.stack);
console.log('router.keys', app.router ? Object.getOwnPropertyNames(app.router) : []);
console.log('app.keys', Object.getOwnPropertyNames(app));
