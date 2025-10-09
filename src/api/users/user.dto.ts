import { z } from 'zod';
import { email, string } from 'zod/v4';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email : z
            .string({
                required_error: 'Email is required',
            })
            .email('Not a valid email'),
        password: z
            .string({
                required_error: 'Password is required',
            })
            .min(6, 'Password must be least 6 characters long'),
    }),
});