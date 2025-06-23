import { UpdateTodo } from "../../../../src/domain";

describe('domain/use-cases/todo/create-todo.ts', () => {
    const mockTodoRepository = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn()
    }
    const updateTodo = new UpdateTodo(mockTodoRepository);
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('updateTodo.execute should call the repository updateById method with args', () => {
        const dto = {
            id: 999,
            text: 'Test text',
            values: jest.fn()
        };
        
        updateTodo.execute(dto);

        expect(mockTodoRepository.updateById).toHaveBeenCalled();
        expect(mockTodoRepository.updateById).toHaveBeenCalledWith(dto);
    });
});
