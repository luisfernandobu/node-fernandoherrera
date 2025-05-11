
const runCommand = async(args: string[]) => {
    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('args.plugin.ts', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return default values', async() => {
        const argv = await runCommand(['-b', '5']);

        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table.txt',
            d: 'outputs',
        }));
    });

    test('should return config with custom values', async() => {
        const argv = await runCommand([
            '-b', '10', 
            '-l', '20',
            '-s',
            '-n', 'test-name.txt',
            '-d', 'test-dir'
        ]);

        expect(argv).toEqual(expect.objectContaining({
            b: 10,
            l: 20,
            s: true,
            n: 'test-name.txt',
            d: 'test-dir',
        }));
    });
});
