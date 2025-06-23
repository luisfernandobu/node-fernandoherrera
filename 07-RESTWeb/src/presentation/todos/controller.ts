import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodoController {

    /* Dependency Injection */
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    private readonly handleError = (res: Response, error: unknown) => {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ error: error.message });
            return;
        }

        // unexpected error
        console.log(error);
        res.status(500).json({ error: 'Internal server error - check logs' });
    }

    public getTodos = (req: Request, res: Response): void => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => this.handleError(res, error));
    }

    public getTodoById = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'id must be a number' });
            return;
        }

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error));
    }

    public createTodo = (req: Request, res: Response): void => {
        const [ error, createTodoDto ] = CreateTodoDto.create(req.body);
        
        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(error => this.handleError(res, error));
    }

    public updateTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error));
    }

    public deleteTodo = (req: Request, res: Response): void => {
        const id = +req.params.id;

        if (isNaN(id)) {
            res.status(400).json({ error: 'id must be a number' });
            return;
        }        

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => this.handleError(res, error));
    }
}
