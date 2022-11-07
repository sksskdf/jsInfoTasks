import {user} from './Module.js';

let nameSymbol = Symbol.for("name");
console.log(user[nameSymbol]);

const recipe = {
    "recipeType" : "monthly",
    "publishDay" : new Date().toLocaleTimeString(),
}

console.log(recipe);