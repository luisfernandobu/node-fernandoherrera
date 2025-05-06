import fs from 'fs';

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        /*
        * repository: StorageRepositry
        */
    ){}

    execute({ fileContent, fileDestination = 'outputs', fileName = 'table.txt' }: Options): boolean {
        const filePath = `${fileDestination}/${fileName}`;

        try {
            if (!fs.existsSync(fileDestination)) {
                fs.mkdirSync(fileDestination, { recursive: true });
            }
    
            fs.writeFileSync(filePath, fileContent, 'utf-8');
        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    }
}
