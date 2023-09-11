// Defining the structure of a board, which consists of columns with their respective types.
interface Board {
    columns: Map<TypedColumn, ColumnType>;
}

// Possible column types in the board.
type TypedColumn = "todo" | "inProgress" | "done";

// Possible task status types.
type StatusType = "notStarted" | "onHold" | "pending" | "inProgress" | "completed";

// Possible task priority types.
type PriorityType = "veryLow" | "low" | "medium" | "high" | "veryHigh";

// Options for displaying task status.
type StatusOptions = "All Status" | "Not Started" | "On Hold" | "Pending" | "In Progress" | "Completed";

// Options for displaying task priority.
type PriorityOptions = "All Priority" | "Very Low" | "Low" | "Medium" | "High" | "Very High";

// Defining the structure of a column.
interface ColumnType {
    id: TypedColumn;
    tasks: Task[];
}

// Defining the structure of a task.
interface Task {
    id: number;
    boardID: number;
    title: string;
    status: TypedColumn;
    columnOrder: number;
    image?: string | null;
}

// Defining the structure of a message in a conversation.
interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

// A collection of messages, representing a conversation.
type Conversation = Message[];

// Defining the structure of user data.
interface UserData {
    id: number;
    fullname: string;
    firstname: string;
    email: string;
    encodedEmail: string;
    isLoggedIn: boolean;
}

// Defining the structure of project data.
interface ProjectData {
    id: number;
    user: string;
    owner: string;
    name: string;
    description: string;
    statusID: StatusType;
    status: StatusOptions;
    progress: number;
    priorityID: PriorityType;
    priority: PriorityOptions;
}

// Defining the structure of board data.
interface BoardData {
    id: number;
    projectID: number;
    name: string;
    description: string;
    statusID: StatusType;
    status: StatusOptions;
    progress: number;
    tasks: number;
    priorityID: PriorityType;
    priority: PriorityOptions;
}

// Defining the structure of custom radio group type.
interface CustomRadioGroupType {
    id: any;
    name: string;
    description: string;
    color: string;
}

// Defining the structure of dropdown options.
interface DropdownOption {
    id?: number;
    name: StatusOptions | PriorityOptions;
}

// Defining the structure of authentication values.
interface AuthValues {
    fullname: string;
    email: string;
    password: string;
}

// Defining the structure of authentication errors.
interface AuthErrors {
    fullname: string;
    email: string;
    password: string;
}

// Props for using drag-and-drop functionality.
interface UseDragAndDropProps {
    board: Board;
    setBoardState: (board: Board) => void;
    updateColumnInDB: (column: ColumnType) => void;
}

// Setters for various data fields.
interface Setters {
    setID: (id: number) => void;
    setName: (name: string) => void;
    setStatus: (statusID: StatusType) => void;
    setPriority: (priorityID: PriorityType) => void;
    setDescription: (description: string) => void;
    setProgress: (progress: number) => void;
}
