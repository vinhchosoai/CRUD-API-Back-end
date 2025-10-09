import { Request,Response, NextFunction } from "express";
import * as userService from './user.service';
import { error } from "console";

export const createUser = async(req : Request, res : Response, next : NextFunction) =>{
    try{
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }   
    catch(error){
        next(error);
    }
};

export const getUserById = async(req : Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params;
        const user =  await userService.findUserById(id);

        if(!user){
            return res.status(404).json({
                error:'NotFoundError',
                message: 'User not found',
            });
        }
        res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
};

export const updateUser = async(req: Request, res: Response, next:NextFunction)=>{
    try{
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await userService.updateUser(id, userData);

        if(!updateUser){
            return res.status(404).json({
                error: 'NotFoundError',
                message: 'User not found',
            });
        }
        res.status(200).json(updatedUser)
    }
    catch(error){
        next(error)
    }
};

export const deleteUser = async (req: Request, res: Response, next:NextFunction)=>{
    try{
        const { id } = req.params;
        const deleteUser = await userService.deleteUser(id);

        if(!deleteUser){
            return res.status(404).json({
                error:'NotFoundError',
                message:'User not found',
            });
        }

        res.status(204).send();
    }
    catch (error){
        next(error);
    }
};

export const getUsers = async(req: Request, res: Response, next:NextFunction)=>{
    try{
        const users = await userService.getUsers();
        res.status(200).json(users);
    }
    catch(error){
        next(error);
    }
}