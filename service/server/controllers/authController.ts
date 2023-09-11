import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import {generateAuthToken} from "../utils/authUtils";
import {addUser, getUserByEmail} from "../database/utilsDB";

// Controller function for user login
export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        // Retrieve user from the database based on the provided email
        const user = await getUserByEmail(email);

        // If no user is found, return an authentication error
        if (!user) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If the passwords don't match, return an authentication error
        if (!passwordMatch) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Generate an authentication token for the user
        const token = generateAuthToken(user);

        // Set the authentication token as a cookie
        res.cookie('authToken', token);

        // Respond with a success message
        res.json({message: 'Login successful'});
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Controller function for user registration
export const registerUser = async (req: Request, res: Response) => {
    const {fullname, email, password} = req.body;

    try {
        // Check if a user with the provided email already exists
        const existingUser = await getUserByEmail(email);

        // If a user with the email exists, return an error
        if (existingUser) {
            return res.status(401).json({message: 'Email already registered'});
        }

        // Hash the provided password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the new user to the database
        await addUser(fullname, email, hashedPassword);

        // Respond with a success message
        res.json({message: 'User registered successfully'});
    } catch (error) {
        // Handle any errors that occur during the registration process
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }
};
