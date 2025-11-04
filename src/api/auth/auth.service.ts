import { prisma } from "../config/prisma";
import { AppError } from "../utils/customErrors";
import { CreateUserDto, userResponseDto } from '../users/user.dto';
import { LoginDto } from './auth.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const selectSafe = {id : true, name : true, email : true, updatedAt : true, createdAt : true} as const;

export async function registerUser(data:CreateUserDto): Promise<userResponseDto> {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
        throw new AppError('ConflictError', 'Email already exists', 409);
    }

    const hash =  await bcrypt.hash(data.password,10);
    try{
        const user = await prisma.user.create({
            data:{name : data.name, email: data.email, password: hash},
            select: selectSafe,
        });
        return user;
    }catch(e: any){
        if(e?.code ==='P2002') throw new AppError('ConflictError','Email already exists',409);
        throw e;
    }
}

export async function loginUser(data: LoginDto): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        throw new AppError('UnauthorizedError', 'Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
        throw new AppError('UnauthorizedError', 'Invalid credentials', 401);
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    return token;
}