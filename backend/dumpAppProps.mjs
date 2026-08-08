import fs from 'fs';
import app from './app.js';

const data = [];

data.push(`APP_TYPE=${app?.constructor?.name}`);
data.push(`USE=${typeof app.use}`);
data.push(`HAS__ROUTER=${app.hasOwnProperty('_router')}`);
data.push(`HAS_ROUTER=${app.hasOwnProperty('router')}`);
data.push(`HAS_STACK=${app.hasOwnProperty('stack')}`);
data.push(`_router_TYPE=${typeof app._router}`);
data.push(`router_TYPE=${typeof app.router}`);
data.push(`stack_TYPE=${typeof app.stack}`);
data.push(`PROPS=${Object.getOwnPropertyNames(app).join(',')}`);
fs.writeFileSync('debug_app_props.txt', data.join('\n'));
console.log('WROTE debug_app_props.txt');
