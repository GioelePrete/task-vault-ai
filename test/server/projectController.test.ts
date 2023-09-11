import {fetchProjects, removeProject, updateProject} from '@/service/server/controllers/projectController';
import {deleteProject, editProject, getProjects} from '@/service/server/database/projectDB';

// Mocking the database functions
jest.mock('@/service/server/database/projectDB', () => ({
    getProjects: jest.fn(),
    addProject: jest.fn(),
    editProject: jest.fn(),
    deleteProject: jest.fn(),
}));

describe('Project Handlers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch projects successfully', async () => {
        const mockRequest = {query: {user: 'base64EncodedUser'}};
        const mockResponse = {json: jest.fn()};

        getProjects.mockResolvedValue([{id: 1, name: 'Project 1'}]);

        await fetchProjects(mockRequest, mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith([{id: 1, name: 'Project 1'}]);
    });

    it('should update a project successfully', async () => {
        const mockRequest = {
            body: {
                id: 1,
                name: 'Updated Project',
                description: '',
                status: '',
                progress: 0,
                priority: 'medium'
            }
        };
        const mockResponse = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        editProject.mockResolvedValue();

        await updateProject(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith('Project edited successfully');
    });

    it('should remove a project successfully', async () => {
        const mockRequest = {query: {id: '1'}};
        const mockResponse = {send: jest.fn()};

        deleteProject.mockResolvedValue();

        await removeProject(mockRequest, mockResponse);

        expect(mockResponse.send).toHaveBeenCalledWith('Project deleted successfully');
    });

    it('should handle errors when fetching projects', async () => {
        const mockRequest = {query: {user: 'base64EncodedUser'}};
        const mockResponse = {status: jest.fn().mockReturnThis(), send: jest.fn()};

        getProjects.mockRejectedValue(new Error('Database error'));

        await fetchProjects(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith('Internal Server Error');
    });
});
