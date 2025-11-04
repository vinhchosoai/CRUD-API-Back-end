import { Request,Response, NextFunction } from "express";
import * as userService from './user.service';


export const getUser = async(req : Request, res: Response, next: NextFunction)=>{
    try{
        const user =  await userService.getUser(req.params.id);

        userService.canFound;

        return res.status(200).json(user);
    }
    catch(error){
        next(error);
    }
};

export const updateUser = async(req: Request, res: Response, next:NextFunction)=>{
    try{
        const user = await userService.updateUser(req.params.id, req.body);
        
        userService.canFound;

        return res.status(200).json(user);
    }
    catch(error){
        next(error)
    }
};

export const deleteUser = async (req: Request, res: Response, next:NextFunction)=>{
    try{
        const user = await userService.deleteUser(req.params.id);

        userService.canFound;

        return res.status(204).send();
    }
    catch (error){
        next(error);
    }
};

export const upgradeRankUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.upgradeRankUser(req.params.id);

        userService.canFound;

        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
    
}