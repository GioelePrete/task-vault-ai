import {loginUser, registerUser} from '@/service/server/controllers/authController';
import {addUser, getUserByEmail} from '@/service/server/database/utilsDB';
import bcrypt from "bcrypt";

jest.mock('@/service/server/database/utilsDB'); // Mock the database functions

describe('Authentication Controller', () => {
    describe('registerUser', () => {
        it('should successfully register a new user', async () => {
            getUserByEmail.mockResolvedValue(null);
            addUser.mockResolvedValue(undefined);

            const mockReq = {body: {fullname: 'John Doe', email: 'new@example.com', password: 'newpassword'}};
            const mockRes = {json: jest.fn()};

            await registerUser(mockReq, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({message: 'User registered successfully'});
        });

        it('should return an error if the email is already registered', async () => {
            getUserByEmail.mockResolvedValue({email: 'existing@example.com'});

            const mockReq = {body: {fullname: 'Jane Doe', email: 'existing@example.com', password: 'newpassword'}};
            const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()};

            await registerUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Email already registered'});
        });
    });

    describe('loginUser', () => {

        it('should return an authentication error for an invalid email', async () => {
            getUserByEmail.mockResolvedValue(null);

            const mockReq = {body: {email: 'nonexistent@example.com', password: 'password'}};
            const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()};

            await loginUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Invalid credentials'});
        });

        it('should return an authentication error for an incorrect password', async () => {
            const mockUser = {email: 'test@example.com', password: await bcrypt.hash('password', 10)};
            getUserByEmail.mockResolvedValue(mockUser);

            const mockReq = {body: {email: 'test@example.com', password: 'wrongpassword'}};
            const mockRes = {status: jest.fn().mockReturnThis(), json: jest.fn()};

            await loginUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Invalid credentials'});
        });
    });
});
