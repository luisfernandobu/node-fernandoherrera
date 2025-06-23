import { GetTodo } from "../../../../src/domain";

describe('domain/use-cases/todo/get-todo.ts', () => {
    const mockTodoRepository = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn()
    }
    const getTodo = new GetTodo(mockTodoRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('getTodo.execute should call the repository findById method with args', () => {
        const todoId = 999;

        getTodo.execute(todoId);

        expect(mockTodoRepository.findById).toHaveBeenCalled();
        expect(mockTodoRepository.findById).toHaveBeenCalledWith(todoId);
    });
});
