"use client";

// Import required modules and components
import {DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {useTaskStore} from "@/store/TaskStore";
import {useEffect, useState} from "react";
import Image from "next/image";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useModalStore} from "@/store/ModalStore";
import {ASSETS_PATH} from "@/utils/constants";

// Define the props type for the TaskCard component
type Props = {
    task: Task;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

// Main TaskCard component
const TaskCard = ({task, index, id, innerRef, draggableProps, dragHandleProps}: Props) => {
    // States
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const deleteTask = useTaskStore((state) => state.deleteTask);
    const [openTaskModal] = useModalStore((state) => [state.openTaskModal, state.taskModalMode]);
    const [setNewTaskInput, setNewTaskType, setTaskID, setEditImageUrl] = useTaskStore((state) => [
        state.setNewTaskInput,
        state.setNewTaskType,
        state.setTaskID,
        state.setEditImageUrl
    ]);

    // Function to open the task edit modal
    const openTaskEditModal = () => {
        if (task.image) {
            setEditImageUrl(task.image);
        }
        setTaskID(task.id);
        setNewTaskInput(task.title);
        setNewTaskType(task.status);
        openTaskModal("edit");
    };

    // Fetch and set the task image URL when the image changes
    useEffect(() => {
        if (task.image) {
            const fetchImage = () => {
                if (task.image) {
                    setImageUrl(`${ASSETS_PATH}/${task.image}`);
                }
            };
            fetchImage();
        }
    }, [task.image]);

    // Render the TaskCard component
    return (
        <div
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >
            <div className="flex justify-between items-center p-5 border-b">
                <p className="font-medium text-gray-800">{task.title}</p>
                <div className="flex space-x-2 text-gray-600">
                    {/* Button to open the task edit modal */}
                    <button className="hover:text-green-500" onClick={openTaskEditModal}>
                        <PencilSquareIcon className="h-6 w-6"/>
                    </button>
                    {/* Button to delete the task */}
                    <button
                        className="hover:text-red-500"
                        onClick={() => deleteTask(index, task, id)}
                    >
                        <TrashIcon className="h-6 w-6"/>
                    </button>
                </div>
            </div>

            {/* Display the task image */}
            {imageUrl && (
                <div className="h-full w-full rounded-b-md">
                    <Image
                        src={imageUrl}
                        alt="task image"
                        width={400}
                        height={200}
                        className="w-full object-contain rounded-b-md"
                    />
                </div>
            )}
        </div>
    );
};

export default TaskCard;
