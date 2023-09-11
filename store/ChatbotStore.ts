import {create} from "zustand";

// Define the interface for the Chatbot state
interface ChatbotState {
    message: string; // Represents the current message in the chatbot
    setMessage: (message: string) => void; // Sets the message state with the provided message
}

// Create the Zustand store for the Chatbot
export const useChatbotStore = create<ChatbotState>((set) => ({
    // Initialize the initial state value
    message: "",
    // Action to set the message state
    setMessage: (message: string) => set({message}),
}));
