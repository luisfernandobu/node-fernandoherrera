import { getUserById } from '../../src/js-foundation/04-arrow-functions';

describe('js-foundation/03-callbacks', () => {
    test('getUserById should return an error if the user does not exist', (done) => {
        const id = 5;

        getUserById(id, (error, user) => {
            expect(error).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();

            done();
        });
    });

    test('getUserById should return a user if the user exists', (done) => {
        const id = 1;

        getUserById(id, (error, user) => {
            expect(error).toBeUndefined();
            expect(user).toBeDefined();
            expect(user?.id).toBe(id);

            done();
        });
    });
});
