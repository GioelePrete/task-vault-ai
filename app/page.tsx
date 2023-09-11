"use client"

// Import necessary dependencies and components
import GuestHomepage from "@/components/others/GuestHomepage";
import Header from "@/components/others/Header";
import {useUserInfo} from "@/hooks/useUserInfo";
import ProjectsPage from "@/components/projects/ProjectsPage";
import ChatbotBubble from "@/components/chatbot/ChatbotBubble";
import {useEffect, useState} from "react";
import Loader from "@/components/others/Loader";

export default function Home() {
    // State to control whether to show the guest homepage
    const [showGuestHomepage, setShowGuestHomepage] = useState<boolean>(false);

    useEffect(() => {
        // Set a timer to change the state after a delay
        const timer = setTimeout(() => {
            setShowGuestHomepage(true);
        }, 200); // Delay of 200 milliseconds

        // Cleanup function to clear the timer if the component unmounts
        return () => {
            clearTimeout(timer);
        };
    }, []);

    // Function to render content for a logged-in useUserInfo
    const renderLoggedInContent = (fullname: string) => {
        return (
            <>
                <Header userFullname={fullname}/>
                <ProjectsPage/>
                <ChatbotBubble/>
            </>
        );
    }

    // Function to render loading state (guest content or loader)
    const renderLoadingState = () => {
        // Conditionally render GuestHomepage or Loader based on showGuestHomepage
        return showGuestHomepage ? <GuestHomepage/> : <Loader/>;
    }

    // Get user information using the user function
    const {fullname, isLoggedIn} = useUserInfo();

    return (
        <main>
            {/* Conditional rendering based on user authentication */}
            {isLoggedIn ? renderLoggedInContent(fullname || "") : renderLoadingState()}
        </main>
    );
}
