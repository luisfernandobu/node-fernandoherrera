import { calculateAge } from '../../src/plugins';

describe('plugins/calculate-age.plugin.ts', () => { 
    test('getAge() should return the age of a person', () => { 
        const birthdate = '1990-01-01';
        const age = calculateAge(birthdate);

        expect(typeof age).toBe('number');
    });

    test('getAge() should return the correct age of a person', () => { 
        const birthdate = '1990-01-01 00:00:01';
        const age = calculateAge(birthdate);
        const today = new Date();
        const expectedAge = today.getFullYear() - new Date(birthdate).getFullYear();

        expect(age).toBe(expectedAge);
    });

    // Spy on a function
    test('getAge() should return zero years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);
        const birthdate = '1995-01-01 00:00:01';
        const age = calculateAge(birthdate);
        
        expect(age).toBe(0);
        expect(spy).toHaveBeenCalled();
        
        spy.mockRestore(); // Restore the original implementation
    });
});
