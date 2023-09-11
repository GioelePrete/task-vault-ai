import {ArrowRightCircleIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {getPriorityColor, getProgressColor} from "@/utils/others";

// Define the shape of the props for the BoardTableRow component
interface Props {
    board: BoardData; // The board data for this row
    index: number; // The index of the row in the table
    onDelete: (boardId: number) => void; // Callback for deleting a board
    onView: (board: BoardData) => void; // Callback for viewing a board
    onEdit: (board: BoardData) => void; // Callback for editing a board
}

// Functional component for rendering a row in the board table
const BoardTableRow = ({board, index, onDelete, onView, onEdit}: Props) => {
    return (
        <tr key={index + 1} className="hover:bg-gray-100">
            {/* Column: Index */}
            <td className="px-6 py-4">{index + 1}</td>
            {/* Column: Board Name */}
            <td className="px-6 py-4">{board.name}</td>
            {/* Column: Board Description */}
            <td className="px-6 py-4">{board.description}</td>
            {/* Column: Board Status */}
            <td className="px-6 py-4">{board.status}</td>
            {/* Column: Board Progress */}
            <td className="px-6 py-4">
                {/* Render a progress bar with dynamic width and color */}
                <div className="relative w-full h-4 bg-gray-300 rounded-full">
                    <div
                        className={`absolute h-full rounded-full z-0 ${getProgressColor(
                            board.progress
                        )}`}
                        style={{
                            width: `${board.progress}%`,
                        }}
                    />
                    <div
                        className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-white font-bold">
                        {board.progress}%
                    </div>
                </div>
            </td>
            {/* Column: Board Priority */}
            <td className="px-6 py-4">
                {/* Display the priority with a colored background */}
                <span
                    className={`inline-block rounded-full px-2 py-1 ${getPriorityColor(
                        board.priority
                    )} text-white`}
                >
                    {board.priority}
                </span>
            </td>
            {/* Column: Board Tasks */}
            <td className="px-6 py-4">{board.tasks}</td>
            {/* Column: Actions */}
            <td className="px-6 py-4 grid grid-cols-3">
                {/* Edit Button */}
                <button onClick={() => onEdit(board)} data-testid="edit-button">
                    <PencilSquareIcon className="w-6 h-6 text-gray-500 hover:text-green-500"/>
                </button>
                {/* Delete Button */}
                <button onClick={() => onDelete(board.id)} data-testid="delete-button">
                    <TrashIcon className="w-6 h-6 text-gray-500 hover:text-red-500"/>
                </button>
                {/* View Button */}
                <button onClick={() => onView(board)} data-testid="view-button">
                    <ArrowRightCircleIcon className="w-7 h-7 text-gray-500 hover:text-yellow-500"/>
                </button>
            </td>
        </tr>
    );
};

export default BoardTableRow;
