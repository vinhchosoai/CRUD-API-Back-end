import { prisma } from "../config/prisma";
import { AppError } from "../utils/customErrors";
import { CreateUserDto, userResponseDto, UpdateUserDto} from './user.dto';
import bcrypt from 'bcryptjs';

const selectSafe = {id : true, name : true, email : true, updatedAt : true, createdAt : true} as const;

export async function createUser(data:CreateUserDto): Promise<userResponseDto> {
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

export async function getUser(id:string): Promise<userResponseDto |null> {
    return prisma.user.findUnique({where:{ id }, select: selectSafe});
}

export async function updateUser(id: string, data: UpdateUserDto): Promise<userResponseDto | null> {
    try{
        const dataToUpdate : Partial<UpdateUserDto & { password ?: string} > = {...data};
        if(data.password){
            dataToUpdate.password = await bcrypt.hash(data.password, 10);
        }else {
            delete(dataToUpdate as any).password;
        }
        const user = await prisma.user.update({
            where : { id },
            data: dataToUpdate,
            select : selectSafe,
        });

        return user;
    }catch(e : any){
        if(e?.code ==='P2025') return null;
        if(e?.code ==='P2002') throw new AppError('ConflictError', 'Email already exists',409);
        throw e;
    }
}

export async function deleteUser(id:string): Promise<boolean> {
    try{
        await prisma.user.delete({ where: { id } });
        return true;
    }catch(e: any){
        if(e?.code === 'P2025') return false;
        throw e;
    }
}