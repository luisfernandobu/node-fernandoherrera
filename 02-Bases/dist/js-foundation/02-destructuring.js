"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroes = void 0;
// Destructuring objects
const usuario = { nombre: "Carlos", edad: 28 };
const { nombre, edad } = usuario;
// console.log(nombre, edad); // "Carlos", 28
// Destructuring arrays
const numeros = [10, 20, 30];
const [primero, segundo] = numeros;
// console.log(primero, segundo); // 10, 20
exports.heroes = ['Flash', 'Superman', 'Batman'];
