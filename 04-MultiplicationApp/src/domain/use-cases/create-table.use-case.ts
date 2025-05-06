export interface ICreateTableUseCase {
    execute: (options: ICreateTableOptions) => string;
}

export interface ICreateTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements ICreateTableUseCase {
    constructor(
        /*
        * DI - Dependency Injection 
        */
    ){}

    execute({ base, limit = 10 }: ICreateTableOptions) {
        let outputMessage = '';

        for (let i = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${ (base * i) }\n`;
        }

        return outputMessage;
    }
}
