import { buildLogger, logger as winstonLogger } from '../../src/plugins';

describe('plugins/logger.plugin.ts', () => {
    test('buildLogger should return an object with log and error methods', () => {
        const logger = buildLogger('test-service');

        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');
    });

    test('log method should log a message with service name', () => {
        const logSpy = jest.spyOn(winstonLogger, 'log');
        const message = 'Test log message';
        const service = 'test-service';

        const logger = buildLogger(service);
        logger.log(message);

        expect(logSpy).toHaveBeenCalledWith('info', message, { service });
    });

    test('error method should log an error message with service name', () => {
        const errorSpy = jest.spyOn(winstonLogger, 'error');
        const message = 'Test error message';
        const service = 'test-service';

        const logger = buildLogger(service);
        logger.error(message);

        expect(errorSpy).toHaveBeenCalledWith(message, { service });
    });
});
