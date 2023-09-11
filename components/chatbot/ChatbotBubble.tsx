"use client"

// Import necessary modules and components
import React, {useState} from "react";
import Chatbot from "@/components/chatbot/Chatbot";
import {GiArtificialIntelligence} from "react-icons/gi";

// Define the ChatbotBubble component
const ChatbotBubble = () => {
    // State to manage the visibility of the chatbot
    const [showChatbot, setShowChatbot] = useState<boolean>(false);

    // Function to toggle the chatbot visibility
    const handleToggleChatbot = () => {
        // Toggle the showChatbot state
        setShowChatbot((prev) => !prev);
    };

    return (
        <>
            {showChatbot ? (
                // Display the Chatbot component if showChatbot is true
                <Chatbot onClose={() => setShowChatbot(false)} data-testid="chatbot-component"/>
            ) : (
                // Display the chatbot toggle button if showChatbot is false
                <button
                    className="rounded-full bg-gray-500 text-gray-50 p-8 fixed bottom-6 right-6 shadow-md hover:bg-orange-500"
                    onClick={handleToggleChatbot}
                    data-testid="chatbot-toggle-button"
                >
                    {/* Chatbot icon */}
                    <GiArtificialIntelligence className="w-16 h-16"/>
                </button>
            )}
        </>
    );
}

export default ChatbotBubble;
