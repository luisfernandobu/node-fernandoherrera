import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('save-file.use-case.ts', () => {
    afterEach(() => {
        // Clean up
        fs.rmSync('outputs', { recursive: true, force: true });
        fs.rmSync('tables', { recursive: true, force: true });
    });

    test('should save file with default values', () => {
        const saveFile =  new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test'
        };

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent =  fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile =  new SaveFile();
        const fileContent = 'custom content test';
        const fileDestination = 'tables';
        const fileName = 'custom-table.txt';
        const fullFilePath = `${fileDestination}/${fileName}`;

        const options = {
            fileContent,
            fileDestination,
            fileName
        };

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(fullFilePath);
        const createdFileContent =  fs.readFileSync(fullFilePath, { encoding: 'utf-8' });
        
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(createdFileContent).toBe(fileContent);
    });

    test('should return false if directory could not be created', () => {
        const saveFile = new SaveFile();
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { 
            throw new Error('test error');
        });
        
        const result = saveFile.execute({ fileContent: 'test content' });
        expect(result).toBe(false);

        mkdirMock.mockRestore();
    });
});
