import {Request, Response} from 'express';
import {createBoard, fetchBoards, removeBoard, updateBoard} from '@/service/server/controllers/boardController';
import * as boardDB from '@/service/server/database/boardDB';

// Mocking Express Request and Response objects
const mockRequest = (): Partial<Request> => ({});
const mockResponse = (): Partial<Response> => ({
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
});

// Mocking boardDB functions
jest.mock('@/service/server/database/boardDB', () => ({
    getBoards: jest.fn(),
    addBoard: jest.fn(),
    editBoard: jest.fn(),
    deleteBoard: jest.fn(),
}));

describe('Board Controller Tests', () => {

    // Test case for fetching boards
    it('should fetch boards successfully', async () => {
        const req = mockRequest();
        const res = mockResponse();

        // Set up the query parameter mock
        req.query = {projectID: '1'}; // You can set the projectID to an appropriate value

        const boardsMock = [{id: 1, name: 'Board 1'}];
        (boardDB.getBoards as jest.Mock).mockResolvedValue(boardsMock);

        await fetchBoards(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith(boardsMock);
    });

    // Test case for creating a board
    it('should create a board successfully', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const mockRequestBody = {
            projectID: 1,
            name: 'New Board',
            description: 'Description',
            status: 'In Progress',
            progress: 50,
            priority: 'High',
        };
        req.body = mockRequestBody;

        await createBoard(req as Request, res as Response);

        expect(boardDB.addBoard).toHaveBeenCalledWith(
            mockRequestBody.projectID,
            mockRequestBody.name,
            mockRequestBody.description,
            mockRequestBody.status,
            mockRequestBody.progress,
            mockRequestBody.priority
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Board added successfully');
    });

    // Test case for updating a board
    it('should update a board successfully', async () => {
        const req = mockRequest();
        const res = mockResponse();
        const mockRequestBody = {
            id: 1,
            name: 'Updated Board',
            description: 'Updated Description',
            status: 'Completed',
            progress: 100,
            priority: 'Low',
        };
        req.body = mockRequestBody;

        await updateBoard(req as Request, res as Response);

        expect(boardDB.editBoard).toHaveBeenCalledWith(
            mockRequestBody.id,
            mockRequestBody.name,
            mockRequestBody.description,
            mockRequestBody.status,
            mockRequestBody.progress,
            mockRequestBody.priority
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith('Board edited successfully');
    });

    // Test case for removing a board
    it('should remove a board successfully', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.query = {id: '1'};

        await removeBoard(req as Request, res as Response);

        expect(boardDB.deleteBoard).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalledWith('Board deleted successfully');
    });
});
