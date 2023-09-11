import React from "react";

// Define the Props type for the ColumnHeader component
type Props = {
    id: TypedColumn;        // The ID of the column
    tasks: Task[];          // List of tasks in the column
    index: number;          // Index of the column
};

// Mapping of column IDs to their display names
const idToColumnText: { [TypedColumn in string]: string } = {
    todo: "Todo",
    inProgress: "In Progress",
    done: "Done",
};

// ColumnHeader component responsible for displaying the column header
const ColumnHeader = ({id, tasks, searchTaskCard}: Props) => {

    // Function to calculate the count of tasks based on search filter
    const calculateTaskCount = (tasks: Task[], searchTaskCard: string | null) => {
        if (!searchTaskCard) {
            // If no search filter, return the total number of tasks
            return tasks.length;
        }

        // Filter tasks based on the search filter and return the count
        return tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(searchTaskCard.toLowerCase())
        ).length;
    };

    return (
        <h2 className="flex justify-between font-bold text-xl p-2">
            {idToColumnText[id]} {/* Display the column name */}
            <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm">
                {/* Display the task count, considering the search filter */}
                {calculateTaskCount(tasks, searchTaskCard)}
            </span>
        </h2>
    );
};

export default ColumnHeader;
