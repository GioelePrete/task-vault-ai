import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useModalStore} from '@/store/ModalStore';
import CollaboratorsModalForm from './CollaboratorsModalForm';

const CollaboratorsModal = () => {
    // Retrieve modal states
    const [collaboratorsModalIsOpen, closeCollaboratorsModal] = useModalStore(state => [
        state.collaboratorsModalIsOpen,
        state.closeCollaboratorsModal
    ]);

    return (
        <Transition appear show={collaboratorsModalIsOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeCollaboratorsModal}>
                {/* Overlay */}
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
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        {/* Modal content */}
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel
                                className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left-align-middle shadow-xl transition-all"
                            >
                                {/* Modal title */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    New Collaborator
                                </Dialog.Title>
                                {/* Render the form component */}
                                <CollaboratorsModalForm closeModal={closeCollaboratorsModal}/>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CollaboratorsModal;
