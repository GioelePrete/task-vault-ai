import React, {FormEvent} from 'react';
import {useCollaboratorStore} from '@/store/CollaboratorStore';
import {getParamFromLink} from '@/utils/others';

const CollaboratorsModalForm = ({closeModal}) => {
    // Retrieve states
    const [collaboratorEmail, setCollaboratorEmail, addCollaborator, modalError, setModalError] = useCollaboratorStore(state => [
        state.collaboratorEmail,
        state.setCollaboratorEmail,
        state.addCollaborator,
        state.modalError,
        state.setModalError
    ]);

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if collaborator email is provided
        if (!collaboratorEmail) return;

        // Get the current project ID from the URL parameter
        const currentProjectID = Number(getParamFromLink('project-id'));

        // Call the addCollaborator function to add the collaborator
        addCollaborator(currentProjectID, collaboratorEmail);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input field for collaborator email */}
            <input
                className="w-full border border-gray-300 rounded-md outline-none p-5"
                type="email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                placeholder="Enter collaborator email.."
            />
            {/* Display success or error message */}
            <p className={`m-2 ${modalError === 'Collaborator added successfully' ? 'text-green-500' : 'text-rose-500'}`}>
                {modalError}
            </p>
            <div className="mt-4">
                {/* Button to close the modal */}
                <button
                    type="reset"
                    onClick={() => {
                        closeModal();
                        setCollaboratorEmail('');
                        setModalError('');
                    }}
                    className="mr-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                    Close
                </button>
                {/* Button to add collaborator */}
                <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                    disabled={!collaboratorEmail}
                >
                    Add Collaborator
                </button>
            </div>
        </form>
    );
};

export default CollaboratorsModalForm;
