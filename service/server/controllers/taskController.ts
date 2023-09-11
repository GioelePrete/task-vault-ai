import {Request, Response} from 'express';
import {
    addTask,
    deleteTaskById,
    deleteTasksByStatus,
    getTaskById,
    getTasksByBoardID,
    insertTasks,
    updateTask
} from '../database/taskDB';
import upload from '../utils/fileUpload';
import * as fs from "fs";

// Retrieve tasks by board ID
export const getTasks = async (req: Request, res: Response) => {
    const {boardID} = req.query;

    try {
        // Fetch tasks from the database based on the provided board ID
        const tasks = await getTasksByBoardID(Number(boardID));
        res.json(tasks);
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Middleware to handle task creation form data
export const createTask = upload.single('image');

// Handle task creation
export const handleCreateTask = async (req: Request, res: Response) => {
    const {boardID, title, status, columnOrder} = req.body;
    const image = req.file;

    try {
        let imageFilename = null;
        if (image) {
            imageFilename = image.filename;
        }

        // Add a new task to the database
        const taskId = await addTask(boardID, title, status, columnOrder, imageFilename);
        res.send({
            id: taskId.toString(),
            imageName: imageFilename,
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Edit a task's details
export const editTask = async (req: Request, res: Response) => {
    const {id, title, status} = req.body;

    try {
        // Get the task's details before the update
        const taskBeforeUpdate = await getTaskById(id);

        if (!taskBeforeUpdate) {
            // Handle the case where the task is not found
            res.status(404).send('Task not found');
            return;
        }

        // Update the task's details in the database
        await updateTask(id, title, status);

        // Respond with the task's details before the update
        res.send({
            boardID: taskBeforeUpdate.boardID,
            columnOrder: taskBeforeUpdate.columnOrder,
            image: taskBeforeUpdate.image,
            prevStatus: taskBeforeUpdate.status,
        });
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Remove a task
export const removeTask = async (req: Request, res: Response) => {
    const {id, image} = req.query;

    try {
        // Delete the task from the database
        await deleteTaskById(Number(id));

        if (image) {
            // Construct the image path
            const imagePath = `public/assets/${image}`;

            // Delete the associated image file from the server
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }

        res.send('Task deleted successfully');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update a column's tasks
export const updateColumn = async (req: Request, res: Response) => {
    const column = req.body;

    try {
        // Delete tasks with the specified column ID from the database
        await deleteTasksByStatus(column.id);

        // Insert the updated tasks into the database
        await insertTasks(column.tasks);

        res.send('Column updated successfully');
    } catch (error) {
        console.error('Error updating column:', error);
        res.status(500).send('Internal Server Error');
    }
};
