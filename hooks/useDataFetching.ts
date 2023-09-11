import {getDataFromDB} from "@/utils/database";
import {getParamFromLink} from "@/utils/others";
import {useEffect, useState} from "react";

// Custom hook to fetch and manage data for a specific type (e.g., boards or collaborators)
export const useDataFetching = (route: string): any[] => {

    // State to store fetched data
    const [data, setData] = useState<any[]>([]);
    // Fetch the current project ID from the URL parameter
    const currentProjectID = getParamFromLink('project-id');

    // Function to fetch data based on the specified route
    const fetchData = async () => {
        try {
            // Fetch data from the database using the current project ID and route
            const fetchedData = await getDataFromDB(route, {projectID: currentProjectID});
            // Update state with fetched data if available
            if (fetchedData) {
                setData(fetchedData);
            }
        } catch (error) {
            // Handle errors by logging them to the console
            console.error(`Error fetching data:`, error);
        }
    };

    // Effect to fetch data when the project ID changes
    useEffect(() => {
        // Fetch data when the component mounts or the project ID changes
        fetchData();
    });

    // Return the fetched data
    return data;
};

