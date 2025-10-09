import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type UserInput = Omit<User,'id' | 'createdAt' | 'updatedAt'>;

export const createUser = async(userData : UserInput) =>{
    const hashedPassword = await bcrypt.hash(userData.password , 10);
    
    const user = await prisma.user.create({
        data:{
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        },
    });

    const{password, ...userWithoutPassword} = user;
    return userWithoutPassword;
};

export const findUserById = async(id: string)=>{
    const user = await prisma.user.findUnique({
        where : {id},
    });

    if(!user){
        return null;
    }

    const { password, ...userWithoutPassWord} = user;
    return userWithoutPassWord;
}

type UserUpdateInput = Partial<UserInput>;

export const updateUser = async(id: string, userData: UserUpdateInput)=>{
    try{
        const user = await prisma.user.update({
            where: { id },
            data: userData,
        });
        
        const { password, ...userWithoutPassword} = userData;
        return userWithoutPassword;
    }
    catch ( error ){
        return null;
    }

};

export const deleteUser = async(id: string)=>{
    try {
        const user = await prisma.user.delete({
            where:{ id },
        });
        return user;
    }
    catch ( error ){
        console.error("DELETE ERROR");
        return null;
    }
};

export const getUsers = async()=>{
    return await prisma.user.findMany({
        select: { id: true, name:true , email:true, createdAt: true,updatedAt: true },
    });
};