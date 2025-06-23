import { GetTodos } from "../../../../src/domain";

describe('domain/use-cases/todo/delete-todo.ts', () => {
    const mockTodoRepository = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn()
    }
    const getTodos = new GetTodos(mockTodoRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('getTodos.execute should call the repository getAll method', () => {
        getTodos.execute();
        expect(mockTodoRepository.getAll).toHaveBeenCalled();
    });
});
