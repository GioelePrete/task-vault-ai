"use client"

// Import necessary dependencies and components
import React from "react";
import Header from "@/components/others/Header";
import {useUserInfo} from "@/hooks/useUserInfo";
import ProjectInterfacePage from "@/components/projects/ProjectInterfacePage";
import ChatbotBubble from "@/components/chatbot/ChatbotBubble";
import {LOADER_PATH} from "@/utils/constants";

// Define the main component
export default function ProjectInterface() {

    // Define a function to render content when the user is logged in
    const renderLoggedInContent = (fullname: string) => {
        return (
            <>
                {/* Render the header with user info */}
                <Header userFullname={fullname}/>
                {/* Render the main project interface page */}
                <ProjectInterfacePage/>
                {/* Render the chatbot bubble */}
                <ChatbotBubble/>
            </>
        );
    }

    // Define a function to render in loading state
    const renderLoadingState = () => {
        return (
            <>
                {/* Render the header without user info */}
                <Header/>
                {/* Display a loading spinner */}
                <div className="h-1/5 mt-40 object-contain">
                    <img src={LOADER_PATH} alt="loader" className="w-1/5 mx-auto"/>
                </div>
            </>
        );
    }

    // Fetch user info
    const {fullname, isLoggedIn} = useUserInfo();

    return (
        <main>
            {/* Conditional rendering based on useUserInfo's login status */}
            {isLoggedIn ? renderLoggedInContent(fullname) : renderLoadingState()}
        </main>
    );
}
