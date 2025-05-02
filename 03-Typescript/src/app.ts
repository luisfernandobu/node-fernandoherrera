import { getHeroById } from "./services/hero.service";

const hero = getHeroById(2);
console.log(hero?.name ?? 'Hero not found');

