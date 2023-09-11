import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import BoardTableRow from '@/components/boards/BoardTableRow';

// Mocking the utility functions
jest.mock('@/utils/others', () => ({
    getPriorityColor: jest.fn(priority => `priority-${priority}`),
    getProgressColor: jest.fn(progress => `progress-${progress}`),
}));

// Sample board data for testing
const boardData = {
    id: 1,
    name: 'Test Board',
    description: 'This is a test board',
    status: 'In Progress',
    progress: 50,
    priority: 'High',
    tasks: 10,
};

describe('BoardTableRow', () => {
    it('renders the correct board data', () => {
        const {getByText} = render(<BoardTableRow board={boardData} index={0} onDelete={() => {
        }} onView={() => {
        }} onEdit={() => {
        }}/>);

        expect(getByText('1')).toBeInTheDocument();
        expect(getByText('Test Board')).toBeInTheDocument();
        expect(getByText('This is a test board')).toBeInTheDocument();
        expect(getByText('In Progress')).toBeInTheDocument();
        expect(getByText('50%')).toBeInTheDocument();
        expect(getByText('High')).toBeInTheDocument();
        expect(getByText('10')).toBeInTheDocument();
    });

    it('calls the onEdit function when edit button is clicked', () => {
        const onEditMock = jest.fn();
        const {getByTestId} = render(<BoardTableRow board={boardData} index={0} onDelete={() => {
        }} onView={() => {
        }} onEdit={onEditMock}/>);

        fireEvent.click(getByTestId('edit-button')); // Assuming 'Edit' text is on the edit button
        expect(onEditMock).toHaveBeenCalledWith(boardData);
    });

    it('calls the onDelete function with correct board ID when delete button is clicked', () => {
        const onDeleteMock = jest.fn();
        const {getByTestId} = render(<BoardTableRow board={boardData} index={0} onDelete={onDeleteMock} onView={() => {
        }} onEdit={() => {
        }}/>);

        fireEvent.click(getByTestId('delete-button')); // Assuming 'Delete' text is on the delete button
        expect(onDeleteMock).toHaveBeenCalledWith(boardData.id);
    });

    it('calls the onView function when view button is clicked', () => {
        const onViewMock = jest.fn();
        const {getByTestId} = render(<BoardTableRow board={boardData} index={0} onDelete={() => {
        }} onView={onViewMock} onEdit={() => {
        }}/>);

        fireEvent.click(getByTestId('view-button')); // Assuming 'View' text is on the view button
        expect(onViewMock).toHaveBeenCalledWith(boardData);
    });

    // Test for checking if priority color class is applied correctly
    it('applies correct priority color class', () => {
        const {container} = render(<BoardTableRow board={boardData} index={0} onDelete={() => {
        }} onView={() => {
        }} onEdit={() => {
        }}/>);

        const priorityElement = container.querySelector('.inline-block');
        expect(priorityElement).toHaveClass('priority-High'); // Assuming 'priority-High' is the class for high priority
    });
});
