import { DeleteTodo } from "../../../../src/domain";

describe('domain/use-cases/todo/delete-todo.ts', () => {
    const mockTodoRepository = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn()
    }
    const deleteTodo = new DeleteTodo(mockTodoRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('deleteTodo.execute should call the repository deleteById method with args', () => {
        const todoId = 999;

        deleteTodo.execute(todoId);

        expect(mockTodoRepository.deleteById).toHaveBeenCalled();
        expect(mockTodoRepository.deleteById).toHaveBeenCalledWith(todoId);
    });
});
