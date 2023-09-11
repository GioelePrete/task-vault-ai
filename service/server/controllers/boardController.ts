import {Request, Response} from 'express';
import {addBoard, deleteBoard, editBoard, getBoards} from '../database/boardDB';

// Fetch boards for a specific project
export const fetchBoards = async (req: Request, res: Response) => {
    const {projectID} = req.query;

    try {
        // Fetch boards from the database for the given projectID
        const boards = await getBoards(Number(projectID));
        // Respond with the retrieved boards in JSON format
        res.json(boards);
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error fetching boards:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Create a new board
export const createBoard = async (req: Request, res: Response) => {
    const {projectID, name, description, status, progress, priority} = req.body;

    try {
        // Call the addBoard function to insert a new board into the database
        await addBoard(projectID, name, description, status, progress, priority);
        // Respond with a success message
        res.status(200).send('Board added successfully');
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error adding board:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update an existing board
export const updateBoard = async (req: Request, res: Response) => {
    const {id, name, description, status, progress, priority} = req.body;

    try {
        // Call the editBoard function to update the specified board in the database
        await editBoard(id, name, description, status, progress, priority);
        // Respond with a success message
        res.status(200).send('Board edited successfully');
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error editing board:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Remove a board by its ID
export const removeBoard = async (req: Request, res: Response) => {
    const {id} = req.query;

    try {
        // Call the deleteBoard function to remove the specified board from the database
        await deleteBoard(Number(id));
        // Respond with a success message
        res.send('Board deleted successfully');
    } catch (error) {
        // If an error occurs, log it and send an internal server error response
        console.error('Error deleting board:', error);
        res.status(500).send('Internal Server Error');
    }
};
