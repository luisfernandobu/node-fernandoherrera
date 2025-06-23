import { UpdateTodoDto } from "../../../../src/domain/dtos";

describe('domain/dtos/todos/create-todo.dto.ts', () => {
    const todoData = {
        id: 1,
        text: 'Test text',
        completedAt: '2025-06-20'
    }

    test('should return an undefined error and an instance of UpdateTodoDto', () => {
        const [ error, updateTodoDto ] = UpdateTodoDto.create(todoData);
        const { id, text, completedAt } = todoData!;

        expect(error).toBeUndefined();
        expect(updateTodoDto).toBeInstanceOf(UpdateTodoDto);
        expect(updateTodoDto?.id).toBe(id);
        expect(updateTodoDto?.text).toBe(text);
        expect(updateTodoDto?.completedAt).toEqual(new Date(completedAt));
    });

    test('should return the values to update in the TODO', () => {
        const [ error, updateTodoDto ] = UpdateTodoDto.create(todoData);
        const { text, completedAt } = todoData;
        const valuesToUpdate = updateTodoDto!.values;

        expect(error).toBeUndefined();
        expect(updateTodoDto).toBeInstanceOf(UpdateTodoDto);
        expect(valuesToUpdate).toEqual({ 
            text: text, 
            completedAt: new Date(completedAt)
        });
    });

    test('should return an error if id property is not valid', () => {
        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...todoData, id: 'abc'});
        
        expect(error).toBe('id must be a number');
        expect(updateTodoDto).toBeUndefined();        
    });

    test('should return an error if completedAt property is not a valid date', () => {
        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...todoData, completedAt: 'abc'});
        
        expect(error).toBe('completedAt must be a valid date');
        expect(updateTodoDto).toBeUndefined();        
    });
});
