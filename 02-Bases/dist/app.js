"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { emailTemplate } from './js-foundation/01-template';
// import { getUserById } from './js-foundation/03-callbacks';
// import { getUserById } from './js-foundation/04-arrow-functions';
const _06_promises_1 = require("./js-foundation/06-promises");
// Template strings
// console.log(emailTemplate);
// Excercise with callbacks and arrow functions
/*
const id = 1;
getUserById(id, (error, user) => {
    if (error)  {
        throw new Error(error);
    }
        
    console.log(user);
});
*/
// Factory functions
/*
import { getUUID, calculateAge } from './plugins';
import { buildMakePerson } from './js-foundation/05-factory-functions';

const makePerson = buildMakePerson({ getUUID, calculateAge });

const person = makePerson({ name: 'John Doe', birthdate: '1997-10-08' });

console.log(person);
*/
// Promises y async/await
const id = 999999;
(0, _06_promises_1.getPokemonById)(id)
    .then(pokemon => console.log(pokemon.name))
    .catch(error => console.log(error))
    .finally(() => console.log('finally'));
// Logger
// const logger = buildLogger('app.js');
// logger.log('Hello from app.js');
// logger.error('Error from app.js');
