import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import CollaboratorTable from '@/components/collaborators/CollaboratorTable';
import CollaboratorsModalForm from '@/components/collaborators/CollaboratorsModalForm';

describe('CollaboratorsModalForm', () => {
    it('renders the form correctly', () => {
        render(<CollaboratorsModalForm closeModal={() => {
        }}/>);

        // Ensure the input field is rendered
        const emailInput = screen.getByPlaceholderText('Enter collaborator email..');
        expect(emailInput).toBeInTheDocument();

        // Ensure the "Add Collaborator" button is rendered
        const addButton = screen.getByText('Add Collaborator');
        expect(addButton).toBeInTheDocument();
    });

    it('disables "Add Collaborator" button when no email is provided', () => {
        render(<CollaboratorsModalForm closeModal={() => {
        }}/>);

        // Ensure the "Add Collaborator" button is initially disabled
        const addButton = screen.getByText('Add Collaborator');
        expect(addButton).toBeDisabled();

        // Fill out the email input
        const emailInput = screen.getByPlaceholderText('Enter collaborator email..');
        fireEvent.change(emailInput, {target: {value: 'test@example.com'}});

        // Ensure the "Add Collaborator" button is enabled
        expect(addButton).toBeEnabled();

        // Clear the email input
        fireEvent.change(emailInput, {target: {value: ''}});

        // Ensure the "Add Collaborator" button is disabled again
        expect(addButton).toBeDisabled();
    });
});


// Mock the deleteCollaborator function
const mockDeleteCollaborator = jest.fn();

// Sample collaborators data for testing
const sampleCollaborators = [
    {user: 'User 2', email: 'user2@example.com', role: 'Owner', projectID: 1},
    {user: 'User 1', email: 'user1@example.com', role: 'Collaborator', projectID: 1}
];

describe('CollaboratorTable', () => {
    it('renders table rows with correct data', () => {
        render(
            <CollaboratorTable collaborators={sampleCollaborators} deleteCollaborator={mockDeleteCollaborator}/>
        );

        // Assert that table rows are rendered with the correct data
        sampleCollaborators.forEach((collaborator) => {
            expect(screen.getByText(collaborator.user)).toBeInTheDocument();
            expect(screen.getByText(collaborator.email)).toBeInTheDocument();
            expect(screen.getByText(collaborator.role)).toBeInTheDocument();
        });
    });
});

