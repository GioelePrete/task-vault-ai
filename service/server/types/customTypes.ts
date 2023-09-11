// Note: In the frontend, types are automatically exported,
// but in the backend, manual export is needed due to limitations.

// Type to represent the possible statuses a task can have
export type StatusType = "notStarted" | "onHold" | "pending" | "inProgress" | "completed";

// Type to represent the priority levels of tasks and projects
export type PriorityType = "veryLow" | "low" | "medium" | "high" | "veryHigh";

// Interface for a task entity
export interface Task {
    id: number; // ID of the task
    boardID: number; // ID of the associated board
    title: string; // Title of the task
    status: TypedColumn; // Status of the task, associated with a TypedColumn value
    columnOrder: number; // Order of the task within the column
    image?: string | null; // Optional image associated with the task
}

// Interface for user data
export interface UserData {
    id: number; // User ID
    fullname: string; // Full name of the user
    firstname: string; // First name of the user
    email: string; // Email address of the user
    encodedEmail: string; // Encoded version of the email (for some specific use case?)
    password: string; // User's password (for backend use, consider not including it here for security)
    isLoggedIn: boolean; // User's login status
}

// Interface for project data
export interface ProjectData {
    id: number; // Project ID
    user: string; // Name of the user associated with the project
    owner: string; // Name of the owner of the project
    name: string; // Name of the project
    description: string; // Description of the project
    statusID: StatusType; // Status ID of the project
    status: StatusOptions; // Status options associated with the project
    progress: number; // Progress value of the project
    priorityID: PriorityType; // Priority ID of the project
    priority: PriorityOptions; // Priority options associated with the project
}

// Interface for board data
export interface BoardData {
    id: number; // Board ID
    projectID: number; // ID of the associated project
    name: string; // Name of the board
    description: string; // Description of the board
    statusID: StatusType; // Status ID of the board
    status: StatusOptions; // Status options associated with the board
    progress: number; // Progress value of the board
    tasks: number; // Number of tasks in the board
    priorityID: PriorityType; // Priority ID of the board
    priority: PriorityOptions; // Priority options associated with the board
}

// Interface for collaborator data
export interface CollaboratorData {
    id: number; // Collaborator ID
    projectID: number; // ID of the associated project
    user: string; // Name of the collaborator
    email: string; // Email of the collaborator
    role: string; // Role of the collaborator
}
