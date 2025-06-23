import { CreateTodoDto } from "../../../../src/domain/dtos";

describe('domain/dtos/todos/create-todo.dto.ts', () => {
    const todoData = {
        text: 'Test text',
    }

    test('should return an undefined error and an instance of CreateTodoDto', () => {
        const [ error, createTodoDto ] = CreateTodoDto.create(todoData);

        expect(error).toBeUndefined();
        expect(createTodoDto).toBeInstanceOf(CreateTodoDto);
        expect(createTodoDto?.text).toBe(todoData.text);
    });

    test('should return an error if text property is missing', () => {
        const [ error, createTodoDto ] = CreateTodoDto.create({  });
        
        expect(error).toBe('text property is required');
        expect(createTodoDto).toBeUndefined();
    });

    test('should return an error if text property is empty', () => {
        const [ error, createTodoDto ] = CreateTodoDto.create({ text: '' });
        
        expect(error).toBe('text property is required');
        expect(createTodoDto).toBeUndefined();
    });
});
