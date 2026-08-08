import app from './app.js';
console.log('APP IMPORT TYPE', typeof app, app && app.constructor && app.constructor.name);
const routes = [];
const stack = app._router?.stack;
if (!stack) {
  console.error('No router stack found on app');
  process.exit(1);
}
for (const layer of stack) {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
    routes.push(`${methods} ${layer.route.path}`);
  } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    const path = layer.regexp?.source.replace('^\\/?', '').replace('\\/?$', '');
    for (const sub of layer.handle.stack) {
      if (sub.route) {
        const methods = Object.keys(sub.route.methods).join(',').toUpperCase();
        routes.push(`${methods} ${path}${sub.route.path}`);
      }
    }
  }
}
console.log(routes.sort().join('\n'));
