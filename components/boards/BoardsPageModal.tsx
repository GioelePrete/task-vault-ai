import React, {FormEvent, Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useModalStore} from '@/store/ModalStore';
import CustomRadioGroup from '@/components/others/CustomRadioGroup';
import {useBoardStore} from '@/store/BoardStore';
import {PRIORITY_STATUS, STATUS_TYPES} from '@/utils/constants';
import {getParamFromLink} from '@/utils/others';

const BoardsPageModal = () => {
    // Get modal state and actions from the store
    const [boardModalIsOpen, closeBoardModal, boardModalMode] = useModalStore(state => [
        state.boardModalIsOpen,
        state.closeBoardModal,
        state.boardModalMode,
    ]);

    // Get board-related state and actions from the store
    const [
        boardID,
        setBoardName,
        boardName,
        setBoardProgress,
        boardProgress,
        setBoardStatus,
        boardStatus,
        setBoardPriority,
        boardPriority,
        setBoardDescription,
        boardDescription,
        addBoard,
        editBoard,
    ] = useBoardStore(state => [
        state.boardID,
        state.setBoardName,
        state.boardName,
        state.setBoardProgress,
        state.boardProgress,
        state.setBoardStatus,
        state.boardStatus,
        state.setBoardPriority,
        state.boardPriority,
        state.setBoardDescription,
        state.boardDescription,
        state.addBoard,
        state.editBoard,
    ]);

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form inputs
        if (!boardName || !boardDescription) return;

        // Get the current project ID from the link
        const currentProjectID = Number(getParamFromLink('project-id'));

        // Add or edit the board based on the modal mode
        if (boardModalMode === 'add') {
            addBoard(currentProjectID, boardName, boardDescription, boardStatus, boardPriority, boardProgress);
        } else {
            editBoard(boardID, boardName, boardDescription, boardStatus, boardPriority, boardProgress);
        }

        // Close the modal
        closeBoardModal();
    };

    return (
        // Modal transition with overlay and content
        <Transition appear show={boardModalIsOpen} as={Fragment}>
            <Dialog as="form" className="relative z-10" onClose={closeBoardModal} onSubmit={handleSubmit}>
                {/* Overlay transition */}
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
                        {/* Modal content transition */}
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
                                className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left-align-middle shadow-xl transition-all"
                            >
                                {/* Modal title */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    {/* Display appropriate title based on modal mode */}
                                    {boardModalMode === 'add' ? 'New Board' : 'Edit Board'}
                                </Dialog.Title>

                                {/* Form fields */}
                                <div className="mt-2 grid grid-cols-2 gap-5">
                                    {/* Board name input */}
                                    <input
                                        className="w-full border border-gray-300 rounded-md outline-none p-5"
                                        type="text"
                                        value={boardName}
                                        onChange={e => setBoardName(e.target.value)}
                                        placeholder="Enter board name.."
                                    />
                                    {/* Board progress input */}
                                    <input
                                        className="w-full border border-gray-300 rounded-md outline-none p-5"
                                        type="number"
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={boardProgress}
                                        onChange={e => setBoardProgress(Number(e.target.value))}
                                        placeholder="Enter board progress in %.."
                                    />
                                </div>

                                {/* Radio groups for status and priority */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Status radio group */}
                                    <CustomRadioGroup
                                        title="Status"
                                        value={boardStatus}
                                        onChange={(e: StatusType) => setBoardStatus(e)}
                                        config={STATUS_TYPES}
                                    />
                                    {/* Priority radio group */}
                                    <CustomRadioGroup
                                        title="Priority"
                                        value={boardPriority}
                                        onChange={(e: PriorityType) => setBoardPriority(e)}
                                        config={PRIORITY_STATUS}
                                    />
                                </div>

                                {/* Board description input */}
                                <div>
                                    <input
                                        className="w-full border border-gray-300 rounded-md outline-none p-5"
                                        type="text"
                                        value={boardDescription}
                                        onChange={e => setBoardDescription(e.target.value)}
                                        placeholder="Enter board description.."
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                                        // Disable the button when form inputs are incomplete
                                        disabled={!boardName || boardProgress === null || !boardDescription}
                                    >
                                        {/* Display appropriate button label based on modal mode */}
                                        {boardModalMode === 'add' ? 'Add Board' : 'Edit Board'}
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

export default BoardsPageModal;
