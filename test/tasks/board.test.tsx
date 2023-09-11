import React from 'react';
import {render, screen} from '@testing-library/react';
import Board from '@/components/tasks/Board';

// Mock the useBoardStore hook
jest.mock('@/store/BoardStore', () => ({
    useBoardStore: jest.fn((selector) =>
        selector({
            board: {
                columns: new Map(),
            },
            getBoard: jest.fn(),
            setBoardState: jest.fn(),
            updateColumnInDB: jest.fn(),
            searchTaskCard: '',
            setSearchTaskCard: jest.fn(),
        })
    ),
}));

describe('Board Component', () => {

    it('renders the search input', () => {
        render(<Board/>);
        const searchInput = screen.getByPlaceholderText(/Search by name../i);
        expect(searchInput).toBeInTheDocument();
    });

    it('renders the correct number of columns', () => {
        // Mock the columns data
        const columns = new Map();
        columns.set('column1', {tasks: []});
        columns.set('column2', {tasks: []});

        const columnElements = Array.from(columns);
        expect(columnElements).toHaveLength(2);
    });

    it('renders the correct number of tasks in a column', () => {
        // Mock the columns data
        const columns = new Map();
        columns.set('column1', {tasks: [{id: 'task1', content: 'Task 1'}]});

        const taskElements = columns.get("column1").tasks;
        expect(taskElements).toHaveLength(1);
    });
});
