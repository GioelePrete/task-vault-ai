// Importing configuration values for backend and frontend from "@/config"
import {backend, frontend} from "@/config";

// Constants for backend and frontend URLs
export const BACKEND_BASE_URL: string = backend.apiUrl;
export const FRONTEND_BASE_URL: string = frontend.apiUrl;

// Message for login failure
export const LOGIN_FAILED: string =
    "It seems like the sign-in credentials you provided are not valid. Please double-check your username and password.";

// Paths for assets
export const ASSETS_PATH: string = "/assets";
export const LOADER_PATH: string = "/assets/loader.svg";
export const LOGO_PATH: string = "/assets/task_vault_ai.png";

// Status Types constant array
export const STATUS_TYPES: CustomRadioGroupType[] = [
    {
        id: "notStarted",
        name: "Not Started",
        description: "A project that hasn't commenced yet",
        color: "bg-red-700",
    },
    {
        id: "pending",
        name: "Pending",
        description: "A project awaiting further action or approval",
        color: "bg-red-500",
    },
    {
        id: "onHold",
        name: "On Hold",
        description: "A project temporarily suspended or delayed",
        color: "bg-orange-500",
    },
    {
        id: "inProgress",
        name: "In Progress",
        description: "A project that is currently being worked on",
        color: "bg-yellow-500",
    },
    {
        id: "completed",
        name: "Completed",
        description: "A project that has been finished successfully",
        color: "bg-green-500",
    },
];

// Priority Status constant array
export const PRIORITY_STATUS: CustomRadioGroupType[] = [
    {
        id: "veryLow",
        name: "Very Low",
        description: "A project with minimal importance or urgency",
        color: "bg-green-700",
    },
    {
        id: "low",
        name: "Low",
        description: "A project with low priority",
        color: "bg-green-500",
    },
    {
        id: "medium",
        name: "Medium",
        description: "A project of moderate priority and significance",
        color: "bg-yellow-500",
    },
    {
        id: "high",
        name: "High",
        description: "A project with significant importance and urgency",
        color: "bg-red-500",
    },
    {
        id: "veryHigh",
        name: "Very High",
        description: "A project of utmost priority and criticality",
        color: "bg-red-700",
    },
];

// Task Status Types constant array
export const TASK_STATUS_TYPES: CustomRadioGroupType[] = [
    {
        id: "todo",
        name: "Todo",
        description: "A new Task to be completed",
        color: "bg-red-500",
    },
    {
        id: "inProgress",
        name: "In Progress",
        description: "A Task is currently being worked on",
        color: "bg-yellow-500",
    },
    {
        id: "done",
        name: "Done",
        description: "A Task that has been completed",
        color: "bg-green-500",
    },
];
