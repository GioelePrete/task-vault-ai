"use client";

import React, {useEffect, useRef, useState} from "react";
import {useTaskStore} from "@/store/TaskStore";
import {useChatbotStore} from "@/store/ChatbotStore";
import {fetchChatbotAnswer} from "@/utils/chatbot";
import {FaTimes} from "react-icons/fa";
import {GiArtificialIntelligence} from "react-icons/gi";
import {useProjectStore} from "@/store/ProjectStore";
import {useUserInfo} from "@/hooks/useUserInfo";
import ChatMessage from "@/components/chatbot/ChatMessage";
import MessageInput from "@/components/chatbot/MessageInput";
import {getParamFromLink} from "@/utils/others";

type Props = { onClose: ((event: React.MouseEvent<HTMLButtonElement>) => void) }

const Chatbot = ({onClose}: Props) => {
    // State management using custom hooks
    const [board, addTask] = useTaskStore((state) => [
        state.board,
        state.addTask,
    ]);
    const [message, setMessage] = useChatbotStore((state) => [
        state.message,
        state.setMessage,
    ]);

    const addProject = useProjectStore(state => state.addProject);

    // Get user information
    const user = useUserInfo();

    // State for managing loading state and conversation history
    const [loading, setLoading] = useState<boolean>(false);
    const [conversation, setConversation] = useState<Conversation>([]);

    // Refs for DOM elements
    const conversationContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Initialize conversation with a greeting message
    useEffect(() => {
        setConversation([
            {role: "assistant", content: `Hello ${user.firstname}, how can I help you?`},
        ]);
    }, []);

    // Handle sending a message on Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Handle sending a user message
    const handleSendMessage = () => {
        if (message.trim() !== "") {
            // Add user message to conversation
            setConversation((prevConversation) => [
                ...prevConversation,
                {role: "user", content: message},
            ]);
            setMessage(""); // Clear input field
            if (inputRef.current) {
                inputRef.current.style.height = "auto"; // Reset the textarea height
            }
        }
    };

    // Listen for new user messages and trigger chatbot response
    useEffect(() => {
        if (conversation.length > 0) {
            const lastUserMessage = conversation[conversation.length - 1];
            if (lastUserMessage.role === "user") {
                setLoading(true); // Show loading spinner

                // Fetch chatbot response and handle updates
                fetchChatbotAnswer(
                    {role: "user", content: lastUserMessage.content},
                    board
                )
                    .then((botResponse) => {
                        // Get the current board id from the URL parameter
                        const currentBoardID = Number(getParamFromLink("board-id"));

                        // Add chatbot response to conversation
                        setConversation((prevConversation) => [
                            ...prevConversation,
                            botResponse.message,
                        ]);

                        // Add new task if chatbot response includes one
                        if (botResponse.newTask) {
                            addTask(
                                currentBoardID,
                                botResponse.newTask.title,
                                botResponse.newTask.status,
                                botResponse.newTask.columnOrder
                            );
                        }
                        // Add new project if chatbot response includes one
                        if (botResponse.newProject) {
                            addProject(
                                user.email,
                                user.fullname,
                                botResponse.newProject.name,
                                botResponse.newProject.description,
                                botResponse.newProject.status,
                                botResponse.newProject.priority,
                                botResponse.newProject.progress
                            );
                        }
                    })
                    .finally(() => {
                        setLoading(false); // Hide loading spinner
                    });
            }
        }
    }, [conversation]);

    // Scroll conversation container to show latest messages
    useEffect(() => {
        if (conversation.length > 0 && conversationContainerRef.current) {
            conversationContainerRef.current.scrollTop =
                conversationContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    // Auto adjust the height of the input textarea based on content
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [message]);

    return (
        <div className="fixed bottom-0 right-0 m-4 w-96 h-120 bg-white rounded-lg shadow-lg">
            <header className="bg-gray-500 p-4 flex items-center rounded-t-lg">
                <GiArtificialIntelligence className={`w-10 h-10 mr-3 text-white ${loading && "animate-spin"}`}/>
                <h1 className="text-2xl font-bold text-white">D.A.V.E</h1>
                <button
                    className="ml-auto text-white"
                    onClick={onClose}
                >
                    <FaTimes className="w-6 h-6"/>
                </button>
            </header>

            {/* Display conversation history */}
            <div className="p-4 h-80 overflow-y-auto" ref={conversationContainerRef}>
                <div className="flex flex-col space-y-2">
                    {conversation.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content}/>
                    ))}
                </div>
            </div>

            {/* Input area for sending messages */}
            <div className="p-4 bg-gray-100 border-t">
                <div className="flex">
                    <MessageInput value={message} onChange={setMessage} onKeyPress={handleKeyPress}/>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
