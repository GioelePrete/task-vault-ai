// Subcomponent for rendering the "Add Task" button
import {PlusIcon} from "@heroicons/react/24/outline";
import React from "react";
import {useTaskStore} from "@/store/TaskStore";
import {useModalStore} from "@/store/ModalStore";

interface Props {
    id: TypedColumn;
}

const ColumnAddTaskButton = ({id}: Props) => {

    // Destructure the required state and functions
    const [setNewTaskType, setNewTaskInput, setImage] = useTaskStore((state) => [
        state.setNewTaskType,
        state.setNewTaskInput,
        state.setImage
    ]);

    const openTaskModal = useModalStore((state) => state.openTaskModal);

    // Function to handle adding a new task
    const handleAddTask = () => {
        // Set initial states for adding a new task
        setNewTaskType(id);
        setNewTaskInput("");
        setImage(null);
        // Open the task modal in "add" mode
        openTaskModal("add");
    };

    return (
        <div className="p-3">
            <button
                className="flex w-full px-4 py-2 items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={handleAddTask}
            >
                <PlusIcon className="h-5 w-5 mr-2"/>
                <span>Add a Task</span>
            </button>
        </div>
    );
};

export default ColumnAddTaskButton;