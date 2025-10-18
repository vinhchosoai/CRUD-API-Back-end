import { Request,Response, NextFunction } from "express";
import * as userService from './user.service';
import { AppError } from "../utils/customErrors";

export const createUser = async(req : Request, res : Response, next : NextFunction) =>{
    try{
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    }   
    catch(error){
        next(error);
    }
};

export const getUser = async(req : Request, res: Response, next: NextFunction)=>{
    try{
        const user =  await userService.getUser(req.params.id);

        if(!user)
            throw new AppError('NotFoundError','User not found',404);
        
        return res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
};

export const updateUser = async(req: Request, res: Response, next:NextFunction)=>{
    try{
        const user = await userService.updateUser(req.params.id, req.body);
        if(!user) throw new AppError('NotFoundError','User not found', 404);
        return res.status(200).json(user);
    }
    catch(error){
        next(error)
    }
};

export const deleteUser = async (req: Request, res: Response, next:NextFunction)=>{
    try{
        const ok = await userService.deleteUser(req.params.id);
        if(!ok) throw new AppError('NotFoundError','User not found', 404);
        return res.status(204).send();
    }
    catch (error){
        next(error);
    }
};

