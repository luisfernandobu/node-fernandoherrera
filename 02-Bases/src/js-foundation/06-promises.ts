import { httpClient } from '../plugins';

/* 
const getPokemonById = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
} 
*/

export const getPokemonById = async(id: string | number) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokemon = await httpClient.get(url);        
        
        return pokemon;
    } catch (error: any) {
        throw `Pokemon not found with id ${id}`;
    }
} 
