import jwt from 'jsonwebtoken';
import {UserData} from "../types/customTypes";

// Load the secret key
const secretKey = "mMzTu48HRjbZ2LVh0TXoIGNvpotWPJUQ";

/**
 * Generates an authentication token using JSON Web Tokens (JWT).
 * @param user - The user data for which the token will be generated.
 * @returns A JWT token string.
 */
export function generateAuthToken(user: UserData): string {
    // Create the token payload using user data.
    const tokenPayload = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
    };
    // Return the generated JWT token.
    return jwt.sign(
        tokenPayload,
        secretKey,
        {expiresIn: '1h'}
    );
}
