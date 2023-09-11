import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import ProjectModalForm from '@/components/projects/ProjectModalForm';

describe('ProjectForm', () => {
    it('renders all input fields', () => {
        render(<ProjectModalForm/>);

        expect(screen.getByPlaceholderText('Enter project name..')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter project progress in %..')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter project description..')).toBeInTheDocument();
    });

    it('calls the onChange handler for project name input', () => {
        const setProjectNameMock = jest.fn();
        render(<ProjectModalForm setProjectName={setProjectNameMock}/>);

        const projectNameInput = screen.getByPlaceholderText('Enter project name..');
        fireEvent.change(projectNameInput, {target: {value: 'New Project'}});

        expect(setProjectNameMock).toHaveBeenCalledWith('New Project');
    });
});
