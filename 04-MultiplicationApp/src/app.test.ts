import { ServerApp } from './presentation/server-app';

describe('app.ts', () => {

    test('should call Server.run with values', async() => { 
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = [
            ...process.argv,
            '-b', '10',
            '-l', '5',
            '-s',
            '-n', 'test-name.txt',
            '-d', 'test-destination'
        ];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-name.txt',
            fileDestination: 'test-destination'
        });
    });
});
