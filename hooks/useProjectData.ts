// Import necessary dependencies and utility functions
import {getDataFromDB} from "@/utils/database";
import {useEffect, useState} from "react";
import {useUserInfo} from "@/hooks/useUserInfo";

// Define the custom hook to fetch project data
export const useProjectData = (): ProjectData[] => {
    // State to store fetched projects data
    const [projectsData, setProjectsData] = useState<ProjectData[]>([]);

    // Get user information using the user utility
    const user = useUserInfo();

    // Function to fetch project data from the database
    const fetchData = async () => {
        try {
            // Fetch data using the getDataFromDB functionø
            const fetchedData = await getDataFromDB("project/getProjects", {user: user.encodedEmail});

            // Check if fetchedData is not null or undefined before updating state
            if (fetchedData) {
                setProjectsData(fetchedData);
            }
        } catch (error) {
            // Log an error if data fetching fails
            console.error(`Error fetching projects:`, error);
        }
    };

    // Use the useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }); // The empty dependency array ensures that the effect runs only once

    // Return the fetched projects data
    return projectsData;
};
