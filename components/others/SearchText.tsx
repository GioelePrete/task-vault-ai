import React from "react";

// Define the props interface with TypeScript types
interface SearchTextProps {
    // Placeholder text for the search input
    placeholder: string;
    // Current value of the search input
    value: string;
    // Event handler for when the input value changes
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // Optional CSS class for additional styling
    className?: string;
}

// Define the SearchText functional component
const SearchText: React.FC<SearchTextProps> = ({placeholder, value, onChange, className}) => {
    return (
        // Form element for the search input
        <form
            className={`items-center space-x-5 bg-gray-50 rounded-md p-2 shadow-md flex-1 md:flex-initial ${className}`}>
            {/* Input field for the search */}
            <input
                // Flex-grow to fill available space
                className="flex-1 outline-none p-2 bg-gray-50"
                // Input type set to text
                type="text"
                // Placeholder text
                placeholder={placeholder}
                // Current value of the input
                value={value}
                // Event handler for input value changes
                onChange={onChange}
            />
        </form>
    );
}

export default SearchText;
