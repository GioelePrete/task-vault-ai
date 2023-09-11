import {Draggable, Droppable} from "react-beautiful-dnd";
import {useTaskStore} from "@/store/TaskStore";
import React from "react";
import ColumnHeader from "@/components/tasks/ColumnHeader";
import ColumnAddTaskButton from "@/components/tasks/ColumnAddTaskButton";
import ColumnRenderTasks from "@/components/tasks/ColumnRenderTasks";

// Define the Props type
type Props = {
    id: TypedColumn;
    task: Task[];
    index: number;
};

// Main Column component
const Column = ({id, task, index}: Props) => {

    // Destructure the required state and functions
    const searchTaskCard = useTaskStore((state) => state.searchTaskCard);

    // Return the main component structure
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable droppableId={index.toString()} type="card">
                        {(provided, snapshot) => (
                            <div
                                className={`p-2 rounded-2xl shadow-sm ${
                                    snapshot.isDraggingOver ? "bg-gray-200" : "bg-white/50"
                                }`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {/* Render the column header */}
                                <ColumnHeader id={id} tasks={task} index={index}/>
                                <div className="space-y-2">
                                    {/* Render the list of tasks */}
                                    <ColumnRenderTasks id={id} tasks={task} searchTaskCard={searchTaskCard}/>
                                    {/* Placeholder for dropping tasks */}
                                    {provided.placeholder}
                                    {/* Render the "Add Task" button */}
                                    <ColumnAddTaskButton id={id}/>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
