"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeroById = void 0;
const heroes_1 = require("../data/heroes");
const getHeroById = (id) => heroes_1.heroes.find(hero => hero.id === id);
exports.getHeroById = getHeroById;
