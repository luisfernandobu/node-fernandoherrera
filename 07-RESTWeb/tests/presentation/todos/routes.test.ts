import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('presentation/todos/routes.ts', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    });

    afterAll(async () => {
        await prisma.todo.deleteMany();
        testServer.close();
    });

    const todo1 = { text: 'Test todo 1' };
    const todo2 = { text: 'Test todo 2' };

    test('should return TODOs api/todos', async () => {
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(2);
        expect(body[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            text: expect.any(String)
        }));
        expect(body[0].completedAt).toBeNull();
    });

    test('should return a TODO api/todos/:id', async () => {
        const newTodo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${newTodo.id}`)
            .expect(200);

        expect(body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        }));

    });

    test('should return an error if TODO to get does not exists api/todos/:id', async () => {
        const todoId = 9999;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({
            error: `TODO with id ${todoId} not found`
        });
    });

    test('should return an error if URL id to get is not valid api/todos/:id', async () => {
        const todoId = 'abc';
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(400);

        expect(body).toEqual({ error: 'id must be a number' });
    });

    test('should return a new TODO api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        });
    });

    test('should return an error if text property is missing api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ error: 'text property is required' });
    });

    test('should return an error if text property is empty api/todos', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ text: '' })
            .expect(400);

        expect(body).toEqual({ error: 'text property is required' });
    });

    test('should return an updated TODO api/todos/:id', async () => {
        const newTodo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${newTodo.id}`)
            .send({
                text: 'Updated text',
                completedAt: '2025-06-19'
            })
            .expect(200);

        expect(body).toEqual({
            id: newTodo.id,
            text: 'Updated text',
            completedAt: '2025-06-19T00:00:00.000Z'
        });
    });

    test('should return an error (404) if TODO to update does not exists /api/todos/:id', async () => {
        const todoId = 9999;
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({})
            .expect(404);

        expect(body).toEqual({ error: `TODO with id ${todoId} not found` });
    });

    test('should return an updated todo (only the date)', async () => {
        const newTodo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${newTodo.id}`)
            .send({ completedAt: '2025-06-19' })
            .expect(200);

        expect(body).toEqual({
            id: newTodo.id,
            text: newTodo.text,
            completedAt: '2025-06-19T00:00:00.000Z'
        });
    });

    test('should return an updated todo (only the text)', async () => {
        const newTodo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${newTodo.id}`)
            .send({ text: 'Updated text' })
            .expect(200);

        expect(body).toEqual({
            id: newTodo.id,
            text: 'Updated text',
            completedAt: null
        });
    });

    test('should return an error if URL id to update is not valid api/todos/:id', async () => {
        const todoId = 'abc';
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({ text: 'Updated text' })
            .expect(400);

        expect(body).toEqual({ error: 'id must be a number' });
    });

    test('should delete a TODO /api/todos/:id', async () => {
        const newTodo = await prisma.todo.create({ data: todo1 });

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${newTodo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        });
    });

    test('should return an error if TODO to delete does not exists /api/todos/:id', async () => {
        const todoId = 9999;

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: `TODO with id ${todoId} not found` });
    });

    test('should return an error if URL id to delete is not valid api/todos/:id', async () => {
        const todoId = 'abc';
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .expect(400);

        expect(body).toEqual({ error: 'id must be a number' });
    });
});
