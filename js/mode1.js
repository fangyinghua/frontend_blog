global[Symbol('foo')] = { foo: 'world' };
console.log(global[Symbol.for('foo')]);

const a = require('./mod.js');