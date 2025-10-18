import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/customErrors";

export const errorHandler : ErrorRequestHandler = (err, _req, res, _next)=>{
    if(err instanceof ZodError){
        return res.status(400).json({   
            error : 'ValidationError', 
            message: err.errors[0]?.message ?? 'Invalid input',
        });
    }
    if(err instanceof AppError){
        const status = (err as any).statusCode ?? (err as any).status ?? 500;
        const type = (err as any).name ?? (err as any).type ?? 'AppError';
        return res.status(err.status).json({error: err.type, message: err.message});
    }
    return res.status(500).json({error :'InternalServerError',message : process.env.NODE_ENV === 'production' ? 'Internal Server Error' : (err?.message ?? 'Internal Error')});
}