import axios from 'axios';
import {getDataFromDB, getSimpleDataFromDB, getTasksGroupedByColumn,} from '@/utils/database'; // Import the functions you want to test

// Mock axios to simulate API requests
jest.mock('axios');

describe('API Functions', () => {
    it('fetches tasks grouped by columns', async () => {
        const mockResponse = {
            data: [
                {
                    id: 1,
                    boardID: 1,
                    title: 'Task 1',
                    status: 'todo',
                    columnOrder: 0,
                },
                {
                    id: 2,
                    boardID: 1,
                    title: 'Task 2',
                    status: 'todo',
                    columnOrder: 1,
                },
            ],
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await getTasksGroupedByColumn();

        expect(result.columns.size).toBe(3);
    });

    it('fetches data from the backend', async () => {
        const mockResponse = {
            data: {example: 'data'},
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await getDataFromDB('endpoint', {param: 'value'});

        expect(result).toEqual(mockResponse.data);
    });

    it('fetches simple data from the backend', async () => {
        const mockResponse = {
            data: 'simple data',
        };

        axios.get.mockResolvedValue(mockResponse);

        const result = await getSimpleDataFromDB('endpoint');

        expect(result).toEqual(mockResponse.data);
    });

    it('handles errors while fetching data', async () => {
        const mockError = new Error('Request failed');
        axios.get.mockRejectedValue(mockError);

        try {
            await getDataFromDB('endpoint', {param: 'value'});
        } catch (error) {
            expect(error).toEqual(mockError);
        }
    });

    it('handles errors while fetching simple data', async () => {
        const mockError = new Error('Request failed');
        axios.get.mockRejectedValue(mockError);

        try {
            await getSimpleDataFromDB('endpoint');
        } catch (error) {
            expect(error).toEqual(mockError);
        }
    });
});
