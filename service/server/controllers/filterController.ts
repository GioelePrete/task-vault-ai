import {Request, Response} from 'express';
import {getPriority, getStatus} from '../database/filterDB';

/**
 * Fetches priority data options from the database and sends it as JSON response.
 * @param req Request object
 * @param res Response object
 */
export const fetchPriority = async (req: Request, res: Response) => {
    try {
        const priority = await getPriority();
        res.json(priority);
    } catch (error) {
        console.error('Error fetching priority:', error);
        res.status(500).send('Internal Server Error');
    }
};

/**
 * Fetches status data options from the database and sends it as JSON response.
 * @param req Request object
 * @param res Response object
 */
export const fetchStatus = async (req: Request, res: Response) => {
    try {
        const status = await getStatus();
        res.json(status);
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).send('Internal Server Error');
    }
};
