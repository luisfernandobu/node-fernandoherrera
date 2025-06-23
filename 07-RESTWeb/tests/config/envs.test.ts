import { envs } from "../../src/config/envs";

describe('config/envs.ts', () => {
    test('should return env values', () => {        
        expect(envs).toEqual(expect.objectContaining({
            PORT: expect.any(Number),
            PUBLIC_PATH: expect.any(String)
        }));
    });

    test('should return an error if required envs are missing', async () => {
        jest.resetModules();
        process.env.PORT = '';

        try {
            await import('../../src/config/envs');
            expect(true).toBe(false); // Should not be reached
        } catch (error) {           
            expect(`${error}`).toContain('"PORT" is a required variable');
        }
    });
});
