import {NextResponse} from "next/server";
import {
    generateResponseData,
    getMessagesData,
    handleAddProject,
    handleAddTask,
    isValidAddTaskArgs,
    isValidMessage,
    isValidTasks
} from "@/utils/chatbot";

export const POST = async (request: Request) => {
    try {
        // Retrieve message and tasks from the request JSON
        const {message, tasks} = await request.json();

        // Validate input data
        if (!isValidMessage(message)) {
            return NextResponse.error("Invalid input data", {status: 400});
        }

        // Get the chat messages data
        let messagesData = getMessagesData();

        messagesData.push(message);

        const response = await generateResponseData(messagesData, tasks)

        // Handle OpenAI API errors
        if (response.error) {
            console.error("OpenAI API Error:", response.error);
            return NextResponse.error({error: "An error occurred while processing your request."}, {status: 500});
        }

        const {data} = response;

        // Handle unexpected API response
        if (!data.choices || data.choices.length === 0) {
            console.error("Unexpected API Response:", data);
            return NextResponse.error({error: "An error occurred while processing your request."}, {status: 500});
        }

        // Process function calls from the chatbot's response
        if (data.choices[0].message?.function_call) {
            const functionName = data.choices[0].message.function_call.name;
            if (data.choices[0].message?.function_call?.arguments) {

                const functionArgs = JSON.parse(data.choices[0].message.function_call.arguments);

                if (functionName === "handleAddTask") {

                    // Validate add task arguments
                    if (!isValidAddTaskArgs(functionArgs)) {
                        return NextResponse.error("Invalid add task arguments", {status: 400});
                    }

                    if (!isValidTasks(tasks)) {
                        data.choices[0].message = {
                            role: "assistant",
                            content: "You need to open a board to perform this operation."
                        };
                        return NextResponse.json(data.choices[0].message);
                    }

                    // Execute the handleAddTask function
                    return NextResponse.json(
                        handleAddTask(
                            functionArgs.task,
                            functionArgs.status,
                            tasks[functionArgs.status]
                        )
                    );
                }

                if (functionName === "handleAddProject") {
                    // Execute the handleAddProject function
                    return NextResponse.json(
                        handleAddProject(
                            functionArgs.project,
                            functionArgs.description,
                            functionArgs.status,
                            functionArgs.priority,
                            functionArgs.progress
                        )
                    );
                }
            }
        }

        return NextResponse.json(data.choices[0].message);

    } catch (error) {
        // Handle internal server errors
        return NextResponse.error("Internal Server Error", {status: 500});
    }
};
