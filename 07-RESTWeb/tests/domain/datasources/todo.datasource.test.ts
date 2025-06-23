import { TodoDatasource } from "../../../src/domain/datasources/todo.datasource";
import { CreateTodoDto, UpdateTodoDto } from "../../../src/domain/dtos";
import { TodoEntity } from "../../../src/domain/entities/todo.entity";

describe('domain/datasources/todo.datasource.ts', () => {
    const data = {
        id: 1,
        text: 'Test text',
        createdAt: null
    };
    const todo = new TodoEntity(data.id, data.text, data.createdAt);

    class MockTodoDatasource implements TodoDatasource {
        async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
            return todo;
        }

        async getAll(): Promise<TodoEntity[]> {
            return [todo];
        }
        
        async findById(id: number): Promise<TodoEntity> {
            return todo;
        }

        async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
            return todo;
        }

        async deleteById(id: number): Promise<TodoEntity> {
            return todo;
        }
    }

    const mockTodoDatasource = new MockTodoDatasource();

    test('instance of MockTodoDatasource should have TodoDatasource structure', async () => {
        expect(mockTodoDatasource).toBeInstanceOf(MockTodoDatasource);
        expect(typeof mockTodoDatasource.create).toBe('function');
        expect(typeof mockTodoDatasource.getAll).toBe('function');
        expect(typeof mockTodoDatasource.findById).toBe('function');
        expect(typeof mockTodoDatasource.updateById).toBe('function');
        expect(typeof mockTodoDatasource.deleteById).toBe('function');
    });

    test('should call create method and return an instance of TodoEntity', async () => {
        const [ , createTodoDto] = CreateTodoDto.create(data);
        const newTodo = await mockTodoDatasource.create(createTodoDto!);

        expect(newTodo).toBeInstanceOf(TodoEntity);
    });

    test('should call getAll method and return an array of TodoEntities', async () => {
        const todos = await mockTodoDatasource.getAll();

        expect(todos).toBeInstanceOf(Array)
        expect(todos).toHaveLength(1);
        expect(todos[0]).toBeInstanceOf(TodoEntity);
    });

    test('should call findById method and return an instance of TodoEntity', async () => {
        const findedTodo = await mockTodoDatasource.findById(data.id);

        expect(findedTodo).toBeInstanceOf(TodoEntity);
    });

    test('should call updateById method and return an instance of TodoEntity', async () => {
        const [ , udpateTodoDto] = UpdateTodoDto.create(data);
        const updatedTodo = await mockTodoDatasource.updateById(udpateTodoDto!);

        expect(updatedTodo).toBeInstanceOf(TodoEntity);
    });

    test('should call deleteById method and return an instance of TodoEntity', async () => {
        const deletedTodo = await mockTodoDatasource.deleteById(data.id);

        expect(deletedTodo).toBeInstanceOf(TodoEntity);
    });
});
