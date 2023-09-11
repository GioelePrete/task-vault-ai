import React from "react";
import {BsRobot} from 'react-icons/bs';
import {FaUserAlt} from "react-icons/fa";

// Define the prop types for the ChatMessage component
type ChatMessageProps = {
    role: "user" | "assistant";
    content: string;
};

// ChatMessage component definition
const ChatMessage = ({role, content}) => {
    // Determine the appropriate message style based on the role of the sender
    const messageStyle = role === "assistant" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800";

    // Determine the appropriate container alignment style based on the role of the sender
    const containerStyle = role === "assistant" ? "items-start" : "justify-end";

    return (
        // Render the chat message container with dynamic styles
        <div className={`flex items-center ${containerStyle}`}>
            {/* Render the assistant icon if the role is "assistant" */}
            {role === "assistant" ? <BsRobot className="w-7 h-7 mr-2 text-gray-500"/> : ""}
            {/* Render the message content with dynamic styling */}
            <div className={`rounded-lg py-2 px-4 w-64 ${messageStyle}`}>
                {content}
            </div>
            {/* Render the user icon if the role is not "assistant" */}
            {role !== "assistant" ? <FaUserAlt className="w-5 h-5 ml-2 text-gray-500"/> : ""}
        </div>
    );
};

export default ChatMessage;
