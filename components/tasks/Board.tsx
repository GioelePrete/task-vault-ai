"use client"

// Import necessary libraries and components
import React, {useEffect} from "react";
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useTaskStore} from "@/store/TaskStore";
import Column from "@/components/tasks/Column";
import SearchText from "@/components/others/SearchText";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import {getParamFromLink} from "@/utils/others";

// Define the Board component
const Board = () => {
    // Extract necessary functions and states from the board store
    const [board, getBoard, setBoardState, updateColumnInDB, searchTaskCard, setSearchTaskCard] = useTaskStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateColumnInDB,
        state.searchTaskCard,
        state.setSearchTaskCard
    ]);

    // Fetch the board data when the component mounts
    useEffect(() => {
        getBoard();
    }, [getBoard]);

    // Get the current board name from the URL parameter
    const currentBoardName = getParamFromLink('board-name');

    // Use the custom useDragAndDrop hook to get the drag-and-drop function
    const {handleOnDragEnd} = useDragAndDrop({board, setBoardState, updateColumnInDB});

    // Render the Board component
    return (
        <div className="pt-8 w-4/6">
            <div className="flex items-end justify-between mx-8">
                {/* Display the current board name */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{currentBoardName}</h1>
                {/* Implement a search input */}
                <SearchText placeholder="Search by name.." value={searchTaskCard}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTaskCard(e.target.value)}/>
            </div>

            {/* Implement drag-and-drop functionality */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="board" direction="horizontal" type="column">
                    {(provided) => (
                        <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto xs:mx-5 py-3"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Map through columns and render Column components */}
                            {Array.from(board.columns.entries()).map(([id, column], index) => (
                                <Column key={id} id={id!} task={column.tasks} index={index}/>
                            ))}
                            {/* Display a placeholder for drag-and-drop */}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Board;
