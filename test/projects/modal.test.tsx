import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ProjectModal from '@/components/projects/ProjectModal';

// Mocking the store hooks
jest.mock('@/store/ModalStore', () => ({
    useModalStore: jest.fn(() => [true, jest.fn(), 'add']),
}));

jest.mock('@/store/ProjectStore', () => ({
    useProjectStore: jest.fn(() => [
        1,
        jest.fn(),
        'Project Name',
        jest.fn(),
        'notStarted',
        jest.fn(),
        'medium',
        jest.fn(),
        'description',
        50,
        jest.fn(),
        jest.fn(),
        jest.fn(),
    ]),
}));

// Test cases
describe('ProjectModal', () => {
    it('renders without crashing', () => {
        render(<ProjectModal/>);
        // Assertions
        expect(screen.getByText('New Project')).toBeInTheDocument();
        expect(screen.getByText('Add Project')).toBeInTheDocument();
    });

    it('enables the submit button when form is valid', () => {
        render(<ProjectModal/>);
        fireEvent.change(screen.getByPlaceholderText('Enter project name..'), {target: {value: 'Test Project'}});
        fireEvent.change(screen.getByPlaceholderText('Enter project progress in %..'), {target: {value: 25}});
        fireEvent.change(screen.getByPlaceholderText('Enter project description..'), {target: {value: 'Test description'}});
        // Assertions
        expect(screen.getByRole('button', {name: 'Add Project'})).toBeEnabled();
    });

    it('renders the edit mode correctly', () => {
        jest.spyOn(require('@/store/ModalStore'), 'useModalStore').mockReturnValue([true, jest.fn(), 'edit']);
        render(<ProjectModal/>);
        // Assertions
        expect(screen.getByRole('heading', {name: 'Edit Project'})).toBeInTheDocument();
    });

    it('submits the form correctly', () => {
        const closeProjectModal = jest.fn();
        const addProject = jest.fn();
        const editProject = jest.fn();
        jest.spyOn(require('@/store/ModalStore'), 'useModalStore').mockReturnValue([true, closeProjectModal, 'add']);
        jest.spyOn(require('@/store/ProjectStore'), 'useProjectStore').mockReturnValue([
            1,
            jest.fn(),
            'Project Name',
            jest.fn(),
            'status',
            jest.fn(),
            'priority',
            jest.fn(),
            'description',
            50,
            jest.fn(),
            addProject,
            editProject,
        ]);
        render(<ProjectModal/>);
        fireEvent.click(screen.getByRole('button', {name: 'Add Project'}));
        // Assertions
        expect(addProject).toHaveBeenCalledTimes(1);
        expect(editProject).toHaveBeenCalledTimes(0);
        expect(closeProjectModal).toHaveBeenCalledTimes(1);
    });
});
