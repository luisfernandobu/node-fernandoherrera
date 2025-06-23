import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe('domain/enitites/todo.entity.ts', () => {
    const todoData = {
        id: 1,
        text: 'Test text',
        completedAt: null
    }

    test('should create an instance of TodoEntity', () => {
        const { id, text, completedAt } = todoData;

        const todo = new TodoEntity(id, text, completedAt);

        expect(todo).toBeInstanceOf(TodoEntity);
        expect(todo.id).toBe(id);
        expect(todo.text).toBe(text);
        expect(todo.completedAt).toBe(completedAt);
    });

    test('TodoEntity.fromObject should create an instance of TodoEntity from an object', () => {
        const todo = TodoEntity.fromObject(todoData);
        const { id, text, completedAt } = todoData;

        expect(todo).toBeInstanceOf(TodoEntity);
        expect(todo.id).toBe(id);
        expect(todo.text).toBe(text);
        expect(todo.completedAt).toBe(completedAt);
    });

    test('isCompleted should return false if completedAt is null or undefined', () => {
        const todo = TodoEntity.fromObject({ ...todoData, completedAt: null });

        expect(todo).toBeInstanceOf(TodoEntity);
        expect(todo.completedAt).toBeNull();
        expect(todo.isCompleted).toBe(false);
    });

    test('isCompleted should return true if completedAt is a valid date', () => {
        const validDate = '2025-12-25';
        const todo = TodoEntity.fromObject({ ...todoData, completedAt: validDate });

        expect(todo).toBeInstanceOf(TodoEntity);
        expect(todo.completedAt).toEqual(new Date(validDate));
        expect(todo.isCompleted).toBe(true);
    });

    test('TodoEntity.fromObject should raise an error if completedAt is not a valid date', () => {
        try {
            TodoEntity.fromObject({ ...todoData, completedAt: 'Invalid date' });
            expect(true).toBe(false); // should not be reached
        } catch (error) {
            expect(error).toBe('completedAt must be a valid date')
        }
    });

    test('TodoEntity.fromObject should raise an error if id property is missing', () => {
        try {
            TodoEntity.fromObject({
                text: todoData.text,
                completedAt: todoData.completedAt
            });
            expect(true).toBe(false); // should not be reached
        } catch (error) {
            expect(error).toBe('id is required')
        }
    });

    test('TodoEntity.fromObject should raise an error if text property is missing', () => {
        try {
            TodoEntity.fromObject({
                id: todoData.id,
                completedAt: todoData.completedAt
            });
            expect(true).toBe(false); // should not be reached
        } catch (error) {            
            expect(error).toBe('text is required');
        }
    });
});
