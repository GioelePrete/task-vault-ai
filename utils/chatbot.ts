import axios from "axios";
import openai from "@/service/openai/openai";

// Function to handle adding a new task
export const handleAddTask = (task: string, status: TypedColumn, columnOrder: number) => {
    const newTask = {
        title: task,
        status: status,
        columnOrder: columnOrder,
    };

    // Return the result of the task addition
    return {
        role: "assistant",
        content: `Successfully added task "${task}" with status "${status}"`,
        newTask: newTask
    };
};

// Function to handle adding a new project
export const handleAddProject = (project: string, description: string, status: StatusType, priority: PriorityType, progress: number) => {
    const newProject = {
        name: project,
        description: description,
        status: status,
        progress: progress,
        priority: priority
    };

    // Return the result of the project addition
    return {
        role: "assistant",
        content: `Successfully added project: "${project} - ${description}"`,
        newProject: newProject
    };
};

// Function to fetch a response from a chatbot
export const fetchChatbotAnswer = async (message: Message, board: Board) => {
    const tasks = formatTasksForAI(board); // Format tasks data for AI

    try {
        const response = await axios.post(
            "/api/generateAnswerMessage",
            JSON.stringify({message, tasks}),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.status !== 200) {
            throw new Error("Request failed");
        }

        // Return the response from the chatbot
        return {
            message: {role: response.data.role, content: response.data.content},
            newTask: response.data.newTask,
            newProject: response.data.newProject
        };
    } catch (error) {
        // Handle errors and return a default response
        return {
            message: {
                role: "assistant",
                content: "Apologies, could you please rephrase the question?",
            },
        };
    }
};

// Function to provide initial messages for the chatbot conversation
export const getMessagesData = () => {
    // List of system messages providing instructions and information
    let messagesData: Conversation = [

        {
            role: "system", content: "You are the AI-Powered chatbot of Task Vault AI. " +
                "Your name is D.A.V.E" +
                "D.A.V.E stands for: Digital Assistant with Virtual Expertise." +
                "Task Vault AI is a Project Management web application. " +
                "Limit your response to 200 characters."
        },

        {
            role: "system", content: "The user can search for a specific project or for a specific board." +
                "A specific Project can be found by using the search filters right above the related table on the right side." +
                "A specific Board can be found by using the search filters right above the related table on the right side." +
                "A project can be filtered by project name, project owner, project status and project priority." +
                "A Board can be filtered by board name, board status and board priority."
        },

        {
            role: "system",
            content: "To add a new project or a new board the user can click on the plus button in the related page." +
                "The plus button to add a new project is located next to the search filters in the projects page." +
                "The plus button to add a new board is located next to the search filters in the boards page." +
                "Pressing the plus button in the projects or boards page will show a dialog allowing the user to provide details for the new entry." +
                "The data required to add a new project is: project name, project progress in %, project status, project priority and a short description." +
                "The data required to add a new board is: board name, board progress in %, board status, board priority and a short description."
        },

        {
            role: "system",
            content: "To edit a project or a board the user can click on the edit button in the related page." +
                "The button to edit a project is located at the end of each row just before the delete button." +
                "The button to edit a board is located at the end of each row just before the delete button." +
                "Pressing the edit button will show a dialog allowing the user to provide details edit the selected entry." +
                "The data required to edit a project is: project name, project progress in %, project status, project priority and a short description." +
                "The data required to edit a board is: board name, board progress in %, board status, board priority and a short description."
        },

        {
            role: "system",
            content: "To delete a project or a board the user can click on the delete button in the related page." +
                "The button to delete a project is located at the end of each row next the edit button." +
                "The button to delete a board is located at the end of each row next the edit button." +
                "Pressing the delete button will delete the selected project or board directly and permanently from the system without asking for any confirmation."
        },

        {
            role: "system",
            content: "To add a new collaborator the user can click on the plus button in the collaborators page." +
                "The plus button to add a new collaborator is located next to the search bar in the collaborators page." +
                "Pressing the plus button in the collaborators page will show a dialog allowing the user to add another user as collaborator." +
                "The data required to add a new collaborator is the email of another useUserInfo." +
                "The user email must be registered with Task Vault AI." +
                "The user email cannot already exist in the collaborators list."
        },

        {
            role: "system",
            content: "Opening a board will show a Kanban board with three columns: Todo, In Progress and Done." +
                "The user will be able to add new tasks by clicking one of the 'Add Task' buttons located at the end of each column." +
                "Pressing the 'Add Task' button in this page will show a dialog allowing the user to add a task under one of the columns." +
                "The data required to add a new task is: task name, task status and optionally an image."
        },

        {
            role: "system", content: "The user can search for a specific task in the Kanban board." +
                "A specific Task can be found by using the search bar right above the board on the right side." +
                "A task can be searched by task name."
        },

        {
            role: "system",
            content: "To edit a task the user can click on the edit button in the related task card." +
                "The button to edit a task is located on the right end side just before the delete button." +
                "Pressing the edit button will show a dialog allowing the user to provide details to edit the selected task." +
                "The data required to edit a task is: task name and task status."
        },

        {
            role: "system",
            content: "To delete a task the user can click on the delete button in the related task card." +
                "The button to delete a task is located on the right end side next the edit button." +
                "Pressing the delete button will delete the selected task directly and permanently from the system without asking for any confirmation."
        },

        {
            role: "system",
            content: "To add a task, call the handleAddTask function. " +
                "To add a project, call the handleAddProject function."
        }

    ];

    // Return the predefined messages for the conversation
    return messagesData;
};

// Function to generate response data for the chatbot conversation
export async function generateResponseData(messagesData: Conversation, tasks: Task[]) {
    messagesData.push({
        role: "system",
        content: `If the user asks for a summary of the tasks provide one counting how many tasks are in each category 
        such as Todo, In progress and Done using the following data: ${JSON.stringify(tasks)}`,
    });

    // Generate a chat completion response using OpenAI
    return await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        temperature: 0.5,
        n: 1,
        stream: false,
        messages: messagesData,
        functions: [
            {
                // List of functions to describe available functions to the AI model
                name: "handleAddProject",
                description: "Handle the logic to add a new project",
                parameters: {
                    type: "object",
                    properties: {
                        project: {
                            type: "string",
                            description: "The name of the new project",
                        },
                        description: {
                            type: "string",
                            description: "A short description for the new project",
                        },
                        status: {
                            type: "string",
                            description:
                                "The status of the project e.g. Not Started, Pending, On Hold, In Progress, Completed",
                            enum: ["notStarted", "pending", "onHold", "inProgress", "completed"],
                        },
                        priority: {
                            type: "string",
                            description:
                                "The priority of the project e.g. Very Low, Low, Medium, High, Very High",
                            enum: ["veryLow", "low", "medium", "high", "veryHigh"],
                        },
                        progress: {
                            type: "number",
                            description: "The progress of the project in steps of 5 from 0 to 100",
                        },
                    },
                    required: ["project", "description", "status", "priority", "progress"],
                },
            },
            {
                name: "handleAddTask",
                description: "Handle the logic to add a new task",
                parameters: {
                    type: "object",
                    properties: {
                        task: {
                            type: "string",
                            description: "The text or title of the task",
                        },
                        status: {
                            type: "string",
                            description:
                                "The status or column of the task e.g. todo, in progress, done",
                            enum: ["todo", "inProgress", "done"],
                        },
                        columnOrder: {
                            type: "string",
                            description: "The order of the column in which the task is added",
                        },
                    },
                    required: ["task", "status", "columnOrder"],
                },
            },
        ]
    });
}

// Function to check if a message is valid
export function isValidMessage(message: Message) {
    return message && message.role && message.content;
}

// Function to check if tasks are valid
export function isValidTasks(tasks: Task[]) {
    return tasks && typeof tasks === "object" && Object.keys(tasks).length > 0;
}

// Function to check if arguments for adding a task are valid
export function isValidAddTaskArgs(args: any) {
    return (
        args &&
        args.task &&
        typeof args.task === "string" &&
        args.status &&
        ["todo", "inProgress", "done"].includes(args.status) &&
        args.columnOrder
    );
}

// Function to format tasks data for AI processing
const formatTasksForAI = (board: Board): { [key: string]: number } => {
    const tasks = Array.from(board.columns.entries());

    const formattedTasks: [string, number][] = tasks.map(([columnKey, value]) => [
        columnKey,
        value.tasks.length,
    ]);

    // Convert the formatted tasks data to an object
    return Object.fromEntries(formattedTasks);
};