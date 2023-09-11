import {Request, Response} from 'express';
import {fetchCollaborators, removeCollaborator} from '@/service/server/controllers/collaboratorController';
import {deleteCollaborator, getCollaborators} from '@/service/server/database/collaboratorDB';

jest.mock('@/service/server/database/collaboratorDB');
jest.mock('@/service/server/database/utilsDB');

describe('Route Handlers', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockRequest = {
            query: {projectID: '123'}, // Set up the necessary query parameter
        };
        mockResponse = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCollaborators', () => {
        it('should fetch collaborators successfully', async () => {
            const collaborators = [{name: 'Collaborator A'}, {name: 'Collaborator B'}];
            getCollaborators.mockResolvedValue(collaborators);

            await fetchCollaborators(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith(collaborators);
        });

        it('should handle fetchCollaborators error', async () => {
            const errorMessage = 'Database error';
            getCollaborators.mockRejectedValue(new Error(errorMessage));
            mockResponse.status = jest.fn().mockReturnThis();

            await fetchCollaborators(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.send).toHaveBeenCalledWith('Internal Server Error');
        });
    });

    describe('removeCollaborator', () => {
        it('should remove collaborator successfully', async () => {
            deleteCollaborator.mockResolvedValue(undefined);
            await removeCollaborator(mockRequest as Request, mockResponse as Response);
            expect(mockResponse.send).toHaveBeenCalledWith('Collaborator deleted successfully');
        });
    });
});
