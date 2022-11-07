import {user} from './Module.js';

let nameSymbol = Symbol.for("name");
console.log(user[nameSymbol]);