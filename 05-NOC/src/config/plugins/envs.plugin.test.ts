import { envs } from "./envs.plugin";

describe('envs.plugin.ts', () => { 
    test('should return env values', () => {
        expect(envs).toEqual(expect.objectContaining({
            PORT: expect.any(Number),
            MAILER_SERVICE: expect.any(String),
            MAILER_EMAIL: expect.any(String),
            MAILER_SECRET_KEY: expect.any(String),
            PROD: expect.any(Boolean),
            MONGO_URL: expect.any(String),
            MONGO_DB_NAME: expect.any(String),
            MONGO_USER: expect.any(String),
            MONGO_PASS: expect.any(String)
        }));
    });

    test('should return error if required envs are missing', async() => {
        jest.resetModules();
        process.env.PORT = '';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false); // Should not be reached
        } catch (error) {
            expect(`${error}`).toContain('"PORT" is a required variable');
        }
    });
});
