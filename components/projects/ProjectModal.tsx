import {FormEvent, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useModalStore} from '@/store/ModalStore';
import {useProjectStore} from '@/store/ProjectStore';
import {useGlobalStore} from '@/store/GlobalStore';
import ProjectModalForm from '@/components/projects/ProjectModalForm';

const ProjectModal = () => {
    // Fetch user data from global store
    const userData = useGlobalStore(state => state.userData);

    // Fetch modal state and functions from ModalStore
    const [projectModalIsOpen, closeProjectModal, projectModalMode] = useModalStore(state => [
        state.projectModalIsOpen,
        state.closeProjectModal,
        state.projectModalMode
    ]);

    // Fetch project-related state and functions from ProjectStore
    const [
        projectID,
        setProjectName,
        projectName,
        setProjectStatus,
        projectStatus,
        setProjectPriority,
        projectPriority,
        setProjectDescription,
        projectDescription,
        projectProgress,
        setProjectProgress,
        addProject,
        editProject
    ] = useProjectStore(state => [
        state.projectID,
        state.setProjectName,
        state.projectName,
        state.setProjectStatus,
        state.projectStatus,
        state.setProjectPriority,
        state.projectPriority,
        state.setProjectDescription,
        state.projectDescription,
        state.projectProgress,
        state.setProjectProgress,
        state.addProject,
        state.editProject
    ]);

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if required fields are not empty
        if (!projectName) return;
        if (!projectDescription) return;

        // Perform appropriate action based on modal mode
        if (projectModalMode === 'add') {
            addProject(
                userData.email,
                userData.fullname,
                projectName,
                projectDescription,
                projectStatus,
                projectPriority,
                projectProgress
            );
        } else {
            editProject(
                projectID,
                projectName,
                projectDescription,
                projectStatus,
                projectPriority,
                projectProgress
            );
        }

        // Close the modal after submission
        closeProjectModal();
    };

    return (
        <Transition appear show={projectModalIsOpen} as={Fragment}>
            {/* Overlay */}
            <Dialog as="form" className="relative z-10" onClose={closeProjectModal} onSubmit={handleSubmit}>

                {/* Semi-transparent background */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                {/* Modal content */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            {/* Actual dialog content */}
                            <Dialog.Panel
                                className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left-align-middle
                shadow-xl transition-all"
                            >

                                {/* Dialog title */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2"
                                              data-testid="project-modal-title">
                                    {projectModalMode === 'add' ? 'New Project' : 'Edit Project'}
                                </Dialog.Title>

                                {/* Project form */}
                                <ProjectModalForm
                                    projectStatus={projectStatus}
                                    projectDescription={projectDescription}
                                    projectPriority={projectPriority}
                                    projectName={projectName}
                                    projectProgress={projectProgress}
                                    setProjectDescription={setProjectDescription}
                                    setProjectName={setProjectName}
                                    setProjectPriority={setProjectPriority}
                                    setProjectProgress={setProjectProgress}
                                    setProjectStatus={setProjectStatus}
                                />

                                {/* Submit button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent
                    bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                                        disabled={!projectName || projectProgress === null || !projectDescription}
                                    >
                                        {projectModalMode === 'add' ? 'Add Project' : 'Edit Project'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ProjectModal;
