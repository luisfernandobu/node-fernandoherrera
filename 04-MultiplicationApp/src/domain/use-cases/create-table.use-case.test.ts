import { CreateTable } from './create-table.use-case';

describe('create-table.use-case.ts', () => {

    test('should create table with default values', () => {
        const base = 5;
        const createTable = new CreateTable();
        const table = createTable.execute({ base });
        const rows = table.split('\n').length;        

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain(`${base} x 1 = ${base}`);
        expect(table).toContain(`${base} x 10 = ${base * 10}`);
        expect(rows).toBe(10);
    });

    test('should create table with custom values', () => {
        const base = 3, limit = 20;
        const options = { base, limit };
        
        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const rows = table.split('\n').length;        

        expect(table).toContain(`${base} x 1 = ${base}`);
        expect(table).toContain(`${base} x ${limit} = ${base * limit}`);
        expect(rows).toBe(limit);
    });
});
