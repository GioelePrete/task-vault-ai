import {Request, Response} from 'express';
import * as taskController from '@/service/server/controllers/taskController';

// Mock Express request and response objects
const mockRequest = (): Request => ({
    query: {},
    body: {},
    file: {},
}) as Request;

const mockResponse = (): Response => {
    const res: Response = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

describe('Task Controller Tests', () => {

    // Test handleCreateTask function
    it('handleCreateTask should create a task', async () => {
        const req = mockRequest();
        req.body = {
            boardID: 1,
            title: 'New Task',
            status: 'todo',
            columnOrder: 1,
        };
        req.file = {filename: 'image.jpg'};
        const res = mockResponse();

        await taskController.handleCreateTask(req, res);

        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({id: expect.any(String)}));
    });

    // Test removeTask function
    it('removeTask should remove a task', async () => {
        const req = mockRequest();
        req.query.id = '123';
        req.query.image = 'image.jpg';
        const res = mockResponse();

        await taskController.removeTask(req, res);

        expect(res.send).toHaveBeenCalledWith('Task deleted successfully');
    });

});
