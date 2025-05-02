import { buildMakePerson } from "../../src/js-foundation/05-factory-functions";

describe('js-foundation/05-factory-functions.ts', () => { 
    const getUUID = () => '1234';
    const calculateAge = () => 25;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({ getUUID, calculateAge });
        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person object', () => {
        const makePerson = buildMakePerson({ getUUID, calculateAge });
        const name = 'John Doe';
        const birthdate = '1999-10-08';
        const person = makePerson({ name, birthdate });

        expect(person).toEqual({
            id: '1234',
            name: name,
            birthdate: birthdate,
            age: 25,
        });
    });
});
