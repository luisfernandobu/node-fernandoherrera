import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('js-foundation/06-promises.ts', () => { 
    test('getPokemonById should return a pokemon if found', async() => {
        const id = 1;
        const pokemon = await getPokemonById(id);        
        
        expect(pokemon).toBeDefined();
        expect(pokemon?.id).toBe(id);
        expect(pokemon?.name).toBe('bulbasaur');
    });

    test('getPokemonById should throw an error if pokemon not found', async() => {
        const id = 99999;

        try {
            await getPokemonById(id);
            expect(true).toBe(false); // This line should not be reached
        } catch (error) {       
            expect(error).toBeDefined();
            expect(error).toBe(`Pokemon not found with id ${id}`);
        }
    });
});
