import React, {useRef} from "react";

// Define the prop types for the MessageInput component
type MessageInputProps = {
    value: string;
    onChange: (newValue: string) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

// MessageInput component
const MessageInput = ({value, onChange, onKeyPress}: MessageInputProps) => {
    // Create a ref to access the textarea element
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Function to handle dynamic input height based on content
    const handleInputHeight = () => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto"; // Reset height
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set height to content size
        }
    };

    return (
        <textarea
            ref={inputRef}
            rows={1}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border-2 border-gray-300 py-2 px-4 focus:outline-none focus:border-orange-500 resize-none overflow-hidden"
            value={value}
            onChange={(e) => {
                onChange(e.target.value); // Update input value
                handleInputHeight(); // Adjust input height
            }}
            onKeyDown={onKeyPress} // Handle key presses
        />
    );
};

export default MessageInput;
