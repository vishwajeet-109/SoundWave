import app from './app.js';

const routes = [];

function getPathFromRegexp(regexp) {
  if (!regexp || !regexp.source) return '';
  const src = regexp.source;
  if (src === '^\\/?$') return '';
  return src
    .replace('^\\/', '/')
    .replace('\\/?$', '')
    .replace(/\\\//g, '/')
    .replace(/\^|\$|\(|\)/g, '');
}

const router = app._router || app.router;
if (!router) {
  throw new Error('Express router not found on app');
}
const stack = router.stack || router().stack;
stack.forEach((layer) => {
  if (layer.route) {
    const path = layer.route.path;
    const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
    routes.push({ path, methods });
  } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    const prefix = getPathFromRegexp(layer.regexp);
    layer.handle.stack.forEach((l) => {
      if (l.route) {
        const path = prefix + l.route.path;
        const methods = Object.keys(l.route.methods).join(',').toUpperCase();
        routes.push({ path, methods });
      }
    });
  }
});

routes
  .filter((r) => r.path.includes('auth') || r.path.includes('/api'))
  .sort((a, b) => a.path.localeCompare(b.path))
  .forEach((r) => console.log(`${r.methods} ${r.path}`));
