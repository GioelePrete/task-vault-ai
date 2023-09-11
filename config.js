// This module.exports statement is used to export an object containing configuration settings for a frontend and backend application.

// The configuration for the frontend application is defined within the 'frontend' object.
module.exports = {
    frontend: {
        // The apiUrl property specifies the URL where the frontend application will make API requests.
        apiUrl: "http://localhost:3000", // Here, the frontend is set to communicate with a local server running on port 3000.
    },
    // The configuration for the backend application is defined within the 'backend' object.
    backend: {
        // The apiUrl property specifies the URL where the backend application's API will be accessible.
        apiUrl: "http://localhost:8080", // The backend is set to expose its API on a local server running on port 8080.
    },
};
