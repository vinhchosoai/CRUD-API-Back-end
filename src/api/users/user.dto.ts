import { z } from 'zod';

const PasswordSchema = z
    .string()
    .min(6,'Password must be at least 6 characters')
    .regex(/\d/, 'Password must contain a number')
    .regex(/[^\w\s]/, 'Password must contain special character');

export const CreateUserSchema = z.object({
    name : z.string().min(1,'Name is required'),
    email : z.string().email('Email is not valid'),
    password: PasswordSchema,
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    email : z.string().email().optional(),
    name : z.string().min(1).optional(),
    password : PasswordSchema.optional(),
}).strict();

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type userResponseDto = {
    id : string;
    email : string;
    name : string;
    createdAt : Date;
    updatedAt : Date;
}