import { heroes } from '../../src/js-foundation/02-destructuring';

describe('js-foundation/02-destructuring', () => { 
   test('heroes should contain Batman', () => {
      expect(heroes).toContain('Batman');
   });

    test('first hero should be Flash', () => {
        const [firstHero] = heroes;
        expect(firstHero).toBe('Flash');
    });

    test('second hero should be Superman', () => {
        const [ , secondHero] = heroes;
        expect(secondHero).toBe('Superman');
    });
});
