import React, {useState} from "react";
import Dropdown from "@/components/others/Dropdown";
import SearchText from "@/components/others/SearchText";
import {PlusCircleIcon} from "@heroicons/react/20/solid";
import {getParamFromLink, saveDataToStore} from "@/utils/others";
import {useModalStore} from "@/store/ModalStore";
import BoardsPageModal from "@/components/boards/BoardsPageModal";
import {useBoardStore} from "@/store/BoardStore";
import {FRONTEND_BASE_URL} from "@/utils/constants";
import BoardTableRow from "@/components/boards/BoardTableRow";
import {useDataFetching} from "@/hooks/useDataFetching";
import {useSimpleDataFetching} from "@/hooks/useSimpleDataFetching";

const BoardsPage = () => {
    // Fetch data
    const boardsData = useDataFetching("board/getBoards");
    const statusData = useSimpleDataFetching("filter/getStatus");
    const priorityData = useSimpleDataFetching("filter/getPriority");

    // State declarations
    const [searchName, setSearchName] = useState<string>("");
    const [searchStatus, setSearchStatus] = useState<DropdownOption>({name: 'All Status'});
    const [searchPriority, setSearchPriority] = useState<DropdownOption>({name: 'All Priority'});

    // Modal state and functions
    const [openBoardModal, setBoardModalMode] = useModalStore((state) => [
        state.openBoardModal,
        state.setBoardModalMode
    ]);

    // Delete board function from the store
    const deleteBoard = useBoardStore((state) => state.deleteBoard);

    // Get project name from URL parameter and utility functions
    const currentProjectName = getParamFromLink('project-name');

    // Filtered board data based on search criteria
    const filteredBoards = boardsData.filter((board: BoardData) => {
        const nameMatch = board.name.toLowerCase().includes(searchName.toLowerCase());
        const statusMatch = searchStatus.name === "All Status" || board.status === searchStatus.name;
        const priorityMatch = searchPriority.name === "All Priority" || board.priority === searchPriority.name;
        return nameMatch && statusMatch && priorityMatch;
    });

    // Retrieve the relevant setters from the store
    const boardSetters : Setters = useBoardStore((state) => ({
        setID: state.setBoardID,
        setName: state.setBoardName,
        setStatus: state.setBoardStatus,
        setPriority: state.setBoardPriority,
        setDescription: state.setBoardDescription,
        setProgress: state.setBoardProgress
    }));

    // Event handlers
    const handleAddBoardClick = () => {
        setBoardModalMode("add");
        openBoardModal();
    };

    const handleEditBoardClick = (board: BoardData) => {
        setBoardModalMode("edit");
        saveDataToStore(board, boardSetters);
        openBoardModal();
    };

    const handleDeleteBoardClick = (boardId: number) => {
        deleteBoard(boardId);
    };

    const handleViewBoardClick = (board: BoardData) => {
        window.location.href = `${FRONTEND_BASE_URL}/board?board-id=${board.id}&board-name=${encodeURIComponent(board.name)}`;
    };

    return (
        <div className="py-8">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between space-x-4 mb-4 items-end">
                    {/* Project Name */}
                    <h1 className="text-3xl font-bold text-gray-800 ml-1">{currentProjectName}</h1>

                    <div className="flex space-x-5">
                        {/* Add Board Button */}
                        <button>
                            <PlusCircleIcon
                                className="h-14 w-14 rounded-full text-gray-500"
                                onClick={handleAddBoardClick}
                            />
                        </button>
                        {/* Search and Filter Controls */}
                        <SearchText
                            placeholder="Search by name.."
                            value={searchName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
                        />
                        <Dropdown
                            options={statusData}
                            value={searchStatus}
                            onchange={setSearchStatus}
                        />
                        <Dropdown
                            options={priorityData}
                            value={searchPriority}
                            onchange={setSearchPriority}
                        />
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="bg-white border-b border-gray-200">
                        <table className="table-auto w-full">
                            <thead className="bg-gray-300 text-left h-16">
                            {/* Table Header */}
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Progress</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Tasks</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {/* Table Rows */}
                            {filteredBoards.map((board: BoardData, index: number) => (
                                <BoardTableRow
                                    key={index}
                                    board={board}
                                    index={index}
                                    onDelete={handleDeleteBoardClick}
                                    onView={handleViewBoardClick}
                                    onEdit={handleEditBoardClick}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Boards Page Modal */}
            <BoardsPageModal/>
        </div>
    );
};

export default BoardsPage;
