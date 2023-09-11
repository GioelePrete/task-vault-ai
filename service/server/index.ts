import express, {Express, NextFunction, Request, Response} from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import taskRoutes from "./routes/taskRoutes";
import filterRoutes from "./routes/filterRoutes";
import boardRoutes from "./routes/boardRoutes";
import collaboratorRoutes from "./routes/collaboratorRoutes";

// Create an instance of Express
const app: Express = express();
// Define the port number for the server
const PORT = 8080;

// Set up middleware
app.use("/", cors({origin: ["http://localhost:3000", "http://localhost:8080"], credentials: true}));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({extended: true})); // Parse URL-encoded request bodies
app.use(express.static("public")); // Serve static files from the "public" directory

// Set up routes using middleware
app.use("/auth", authRoutes); // Authentication routes
app.use("/filter", filterRoutes); // Filtering routes
app.use("/project", projectRoutes); // Project-related routes
app.use("/board", boardRoutes); // Board-related routes
app.use("/collaborator", collaboratorRoutes); // Collaborator-related routes
app.use("/task", taskRoutes); // Task-related routes

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Log the error
    res.status(500).send("Internal Server Error"); // Respond with a 500 Internal Server Error
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
