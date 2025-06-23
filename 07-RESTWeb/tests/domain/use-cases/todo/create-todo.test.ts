import { CreateTodo } from "../../../../src/domain";

describe('domain/use-cases/todo/create-todo.ts', () => {
    const mockTodoRepository = {
        create: jest.fn(),
        getAll: jest.fn(),
        findById: jest.fn(),
        updateById: jest.fn(),
        deleteById: jest.fn()
    }
    const createTodo = new CreateTodo(mockTodoRepository);
    
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('createTodo.execute should call the repository create method with args', () => {
        const dto = { text: 'Test text' };
        
        createTodo.execute(dto);

        expect(mockTodoRepository.create).toHaveBeenCalled();
        expect(mockTodoRepository.create).toHaveBeenCalledWith(dto);
    });
});
