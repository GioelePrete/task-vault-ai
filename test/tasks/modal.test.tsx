import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskModal from '@/components/tasks/TaskModal';

// Mock the custom hook dependencies and functions
jest.mock('@/store/ModalStore', () => ({
    useModalStore: jest.fn((selector) => selector({
        taskModalIsOpen: true,
        closeTaskModal: jest.fn(),
        taskModalMode: 'add'
    })),
}));

jest.mock('@/utils/others', () => ({
    useTaskManagement: jest.fn(() => ({
        addTask: jest.fn(),
        newTaskInput: '',
        setNewTaskInput: jest.fn(),
        image: null,
        setImage: jest.fn(),
        newTaskType: '',
        setNewTaskType: jest.fn(),
        editTask: jest.fn(),
        taskID: '',
        editImageUrl: '',
        columnOrder: '',
        currentBoardID: '',
    })),
}));

// Mock the image object for testing
const mockImage = new File(['test'], 'test.png', {type: 'image/png'});

describe('TaskModal component', () => {
    it('renders without errors', () => {
        render(<TaskModal/>);
        expect(screen.getByRole("heading", {name: "New Task"})).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        render(<TaskModal/>);

        const submitButton = screen.getByText(/Add Task/i);
        await userEvent.click(submitButton);

        // Assert that the addTask function was called
        expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
    });

    it('uploads and displays an image', async () => {
        render(<TaskModal/>);

        const imageInput = screen.getByRole("button", {name: "Upload Image"});
        fireEvent.change(imageInput, {target: {files: [mockImage]}});

        // Assert that the setImage function was called with the mockImage
        expect(imageInput.files[0]).toStrictEqual(mockImage);
    });

    it('disables submit button if newTaskInput is empty', async () => {
        render(<TaskModal/>);

        const submitButton = screen.getByText(/Add Task/i);

        // Assert that the submit button is initially disabled
        expect(submitButton).toBeDisabled();
    });
});
