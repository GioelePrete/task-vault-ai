"use client"

// Importing necessary components and modules
import Board from "@/components/tasks/Board";
import Header from "@/components/others/Header";
import TaskModal from "@/components/tasks/TaskModal";
import {useUserInfo} from "@/hooks/useUserInfo";
import ChatbotBubble from "@/components/chatbot/ChatbotBubble";
import Loader from "@/components/others/Loader";

export default function ProjectBoard() {

    const renderLoggedInContent = (fullname: string) => {
        return (
            <>
                <Board/>
                <TaskModal/>
                <ChatbotBubble/>
            </>
        );
    }

    // Fetching user information using user function
    const {fullname, isLoggedIn} = useUserInfo();

    return (
        <main>
            {/* Rendering the Header component*/}
            <Header userFullname={fullname}/>
            {/* Conditional rendering based on useUserInfo's authentication status */}
            {isLoggedIn ? renderLoggedInContent(fullname) : <Loader/>}
        </main>
    );
}
