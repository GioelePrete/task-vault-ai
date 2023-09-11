// Function to render individual tasks
import {Draggable} from "react-beautiful-dnd";
import TaskCard from "@/components/tasks/TaskCard";
import React from "react";

interface Props {
    id: TypedColumn;
    tasks: Task[];
    searchTaskCard: string | null
}

const ColumnRenderTasks = ({id, tasks, searchTaskCard}: Props) => {
    // Sort tasks based on their column order
    tasks.sort((a, b) => a.columnOrder - b.columnOrder);

    return tasks.map((task, index) => {
        // Filter tasks based on search criteria if applicable
        if (searchTaskCard && !task.title.toLowerCase().includes(searchTaskCard.toLowerCase())) {
            return null; // Skip rendering this task
        }

        return (
            <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
            >
                {(provided) => (
                    // Render the TaskCard component for this task
                    <TaskCard
                        task={task}
                        index={index}
                        id={id}
                        innerRef={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                    />
                )}
            </Draggable>
        );
    });
};

export default ColumnRenderTasks;
