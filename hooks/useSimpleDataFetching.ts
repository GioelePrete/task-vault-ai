// Import the necessary functions and modules
import {getSimpleDataFromDB} from "@/utils/database";
import {useEffect, useState} from "react";

// Define the custom hook for fetching and managing simple data
export const useSimpleDataFetching = (route: string): DropdownOption[] => {

    // Initialize state to hold fetched dropdown data
    const [dropdownData, setDropdownData] = useState<DropdownOption[]>([]);

    // Function to fetch data from the database
    const fetchData = async () => {
        try {
            // Construct the appropriate method name based on route
            const data = await getSimpleDataFromDB(route);

            // If data is fetched successfully, update the state
            if (data) {
                setDropdownData(data);
            }
        } catch (error) {
            // Handle errors by logging them
            console.error(`Error fetching data:`, error);
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Return the fetched dropdown data
    return dropdownData;
};
