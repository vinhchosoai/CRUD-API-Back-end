import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.registerUser({ name, email, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const token = await authService.loginUser({ email, password });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
}