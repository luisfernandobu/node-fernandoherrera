import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { ServerApp } from './server-app';

describe('server-app.ts', () => {
    const options = {
        base: 5,
        limit: 10,
        showTable: true,
        fileName: 'test-filename.txt',
        fileDestination: 'test-destination'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        // jest.restoreAllMocks();
    })

    test('should create a ServerApp instance', () => {
        const app = new ServerApp();
        expect(app).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {
        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(3);
        expect(logSpy).toHaveBeenCalledWith('Server running...');
        expect(logSpy).toHaveBeenCalledWith('File created!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
    });

    test('should run with custom mocked values', () => {
        const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
        const saveMock = jest.fn().mockReturnValue(true);
        const logMock = jest.fn();
        const logErrorMock = jest.fn();

        console.log = logMock;
        console.error = logErrorMock
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveMock).toHaveBeenCalledWith({
            fileContent: '1 x 1 = 1',
            fileDestination: options.fileDestination,
            fileName: options.fileName
        });
        expect(logMock).toHaveBeenCalledWith('File created!');
        expect(logErrorMock).not.toHaveBeenCalled();
    });
});
