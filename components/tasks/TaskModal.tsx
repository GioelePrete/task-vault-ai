"use client";

// Import required modules and components
import React, {FormEvent, Fragment, useRef} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useModalStore} from "@/store/ModalStore";
import Image from "next/image";
import {PhotoIcon} from "@heroicons/react/24/solid";
import CustomRadioGroup from "@/components/others/CustomRadioGroup";
import {ASSETS_PATH, TASK_STATUS_TYPES} from "@/utils/constants";
import {useTaskManagement} from "@/utils/others";

const TaskModal = () => {
    // Destructure values from the util function
    const {
        addTask,
        newTaskInput,
        setNewTaskInput,
        image,
        setImage,
        newTaskType,
        setNewTaskType,
        editTask,
        taskID,
        editImageUrl,
        columnOrder,
        currentBoardID
    } = useTaskManagement();

    // Destructure modal states
    const [taskModalIsOpen, closeTaskModal, taskModalMode] = useModalStore((state) => [
        state.taskModalIsOpen,
        state.closeTaskModal,
        state.taskModalMode
    ]);

    // Create a ref for the image picker input element
    const imagePickerRef = useRef<HTMLInputElement>(null);

    // Function to handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if the new task input is empty
        if (!newTaskInput) return;

        // Check the modal mode and perform corresponding action
        if (taskModalMode === "add") {
            addTask(currentBoardID, newTaskInput, newTaskType, String(columnOrder), image);
            setImage(null); // Reset the image after adding the task
        } else {
            editTask(taskID, newTaskInput, newTaskType);
        }

        closeTaskModal(); // Close the modal
    }

    return (
        <Transition appear show={taskModalIsOpen} as={Fragment}>
            {/* Overlay for the modal */}
            <Dialog as="form" className="relative z-10" onClose={closeTaskModal} onSubmit={handleSubmit}>

                {/* Semi-transparent overlay */}
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

                        {/* Modal panel */}
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
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left-align-middle
                shadow-xl transition-all"
                            >
                                {/* Modal title */}
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                                    {taskModalMode === "add" ? "New Task" : "Edit Task"}
                                </Dialog.Title>

                                {/* New task input */}
                                <div className="mt-2">
                                    <input
                                        className="w-full border border-gray-300 rounded-md outline-none p-5"
                                        type="text"
                                        value={newTaskInput}
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        placeholder="Enter a task here.."
                                    />
                                </div>

                                {/* Radio group for task type */}
                                <CustomRadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}
                                                  config={TASK_STATUS_TYPES}/>

                                {/* Image upload and display */}
                                <div>
                                    {/* Conditionally render image upload button */}
                                    {(taskModalMode === "add") && (
                                        <button
                                            type="button"
                                            className="w-full border border-gray-300 rounded-md outline-none p-5
                    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => imagePickerRef.current?.click()}
                                        >
                                            <PhotoIcon className="h-6 w-6 mr-2 inline-block"/>
                                            Upload Image
                                        </button>
                                    )}

                                    {/* Conditionally render uploaded image */}
                                    {(image && taskModalMode === "add") && (
                                        <Image
                                            className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                                            src={URL.createObjectURL(image)}
                                            alt="uploaded image"
                                            width={200}
                                            height={200}
                                            onClick={() => setImage(null)}
                                        />
                                    )}

                                    {/* Conditionally render edited image */}
                                    {(editImageUrl && taskModalMode === "edit") && (
                                        <Image
                                            className="w-full h-44 object-cover mt-2"
                                            src={`${ASSETS_PATH}/${editImageUrl}`}
                                            alt="uploaded image"
                                            width={200}
                                            height={200}
                                        />
                                    )}

                                    {/* Hidden input for image picker */}
                                    <input
                                        type="file"
                                        ref={imagePickerRef}
                                        hidden
                                        onChange={(e) => {
                                            // Check if the selected file is an image
                                            if (!e.target.files![0].type.startsWith("image/")) return;
                                            setImage(e.target.files![0]);
                                        }}
                                    />
                                </div>

                                {/* Submit button */}
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent
                    bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                                        disabled={!newTaskInput}
                                    >
                                        {taskModalMode === "add" ? "Add Task" : "Edit Task"}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default TaskModal;
