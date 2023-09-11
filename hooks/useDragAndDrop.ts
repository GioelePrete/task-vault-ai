import {useEffect} from "react";
import {DropResult, resetServerContext} from "react-beautiful-dnd";

const useDragAndDrop = ({board, setBoardState, updateColumnInDB}: UseDragAndDropProps) => {
    // Handles the drag and drop of columns and tasks
    const handleOnDragEnd = (result: DropResult) => {
        try {

            const {destination, source, type} = result;
            // If there's no destination, the item was dropped outside of a droppable area
            if (!destination) return;
            // Determine whether the drag is for a column or a task
            if (type === "column") {
                // Handle column drag end
                handleColumnDragEnd(source.index, destination.index);
            } else {
                // Handle task drag end
                handleTaskDragEnd(source, destination);
            }
        } catch (error) {
            console.error("Error handling drag and drop:", error);
        }
    };

    // Handles the drag and drop of columns
    const handleColumnDragEnd = (sourceIndex: number, destinationIndex: number) => {
        try {
            // Get the columns as entries to manipulate their order
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(sourceIndex, 1);
            entries.splice(destinationIndex, 0, removed);
            const rearrangedColumns = new Map(entries);
            // Update the board state with the rearranged columns
            setBoardState({...board, columns: rearrangedColumns});
        } catch (error) {
            console.error("Error handling column drag:", error);
        }
    };

    // Handles the drag and drop of tasks
    const handleTaskDragEnd = (
        source: DropResult["source"],
        destination: DropResult["destination"]
    ) => {
        try {
            // Extract necessary information about the drag
            const {sourceColId, destColId, sourceIndex, destIndex} = extractDragInfo(source, destination);
            // Get the source and destination columns
            const sourceCol = board.columns.get(sourceColId);
            const destCol = board.columns.get(destColId);
            // If source or destination columns don't exist, return
            if (!sourceCol || !destCol) return;
            // If the source and destination are the same, return
            if (sourceCol === destCol && sourceIndex === destIndex) return;
            // Clone the columns map to work with a new instance
            let newColumns = new Map(board.columns);

            if (sourceCol.id === destCol.id) {
                // Handle same column drag
                handleSameColumnDrag(sourceCol, newColumns, sourceIndex, destIndex);
                // Update the column in the database
                updateColumnInDB(newColumns.get(sourceCol.id));
            } else {
                // Handle different column drag
                handleDifferentColumnDrag(sourceCol, destCol, newColumns, sourceIndex, destIndex);
                // Update both source and destination columns in the database
                updateColumnInDB(newColumns.get(sourceCol.id));
                updateColumnInDB(newColumns.get(destCol.id));
            }

            // Update the board state with the new columns
            setBoardState({...board, columns: newColumns});
        } catch (error) {
            console.error("Error handling task drag:", error);
        }
    };

    // Extracts drag information from source and destination
    const extractDragInfo = (source: DropResult["source"], destination: DropResult["destination"]) => {
        const {droppableId: sourceDroppableId, index: sourceIndex} = source;
        const {droppableId: destDroppableId, index: destIndex} = destination;

        const sourceColId = Array.from(board.columns.keys())[sourceDroppableId];
        const destColId = Array.from(board.columns.keys())[destDroppableId];

        return {sourceColId, destColId, sourceIndex, destIndex};
    };

    // Handles dragging within the same column
    const handleSameColumnDrag = (sourceCol: ColumnType, newColumns: Map<TypedColumn, ColumnType>, sourceIndex: number, destIndex: number) => {
        try {
            // Clone the tasks array to avoid mutation
            const newTasks = sourceCol.tasks.slice();
            const movedTask = newTasks.splice(sourceIndex, 1)[0];
            newTasks.splice(destIndex, 0, {...movedTask});

            // Create a new column with updated tasks and column order
            const newCol = {
                id: sourceCol.id,
                tasks: newTasks.map((task, index) => ({
                    ...task,
                    columnOrder: index,
                })),
            };

            // Update the column in the newColumns map
            newColumns.set(sourceCol.id, newCol);
        } catch (error) {
            console.error("Error handling same column drag:", error);
        }
    };

    // Handles dragging between different columns
    const handleDifferentColumnDrag = (sourceCol: ColumnType, destCol: ColumnType, newColumns: Map<TypedColumn, ColumnType>, sourceIndex: number, destIndex: number) => {
        try {
            // Clone tasks arrays to avoid mutation
            const newTasks = sourceCol.tasks.slice();
            const [taskRemoved] = newTasks.splice(sourceIndex, 1);
            const finishTasks = destCol.tasks.slice();
            finishTasks.splice(destIndex, 0, taskRemoved);

            // Create new column objects for the source and destination columns
            const startCol = {
                id: sourceCol.id,
                tasks: newTasks,
            };

            const destinationCol = {
                id: destCol.id,
                tasks: finishTasks.map((task, index) => ({
                    ...task,
                    status: destCol.id,
                    columnOrder: index,
                })),
            };

            // Update both source and destination columns in the newColumns map
            newColumns.set(startCol.id, startCol);
            newColumns.set(destCol.id, destinationCol);
        } catch (error) {
            console.error("Error handling different column drag:", error);
        }
    };

    // Reset the server context when the component mounts
    useEffect(() => {
        resetServerContext();
    }, []);

    // Return the handleOnDragEnd function for external use
    return {handleOnDragEnd};
};

export default useDragAndDrop;
