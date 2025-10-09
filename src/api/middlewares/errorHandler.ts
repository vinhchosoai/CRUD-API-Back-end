import { Request,Response,NextFunction,ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next )=>{
    console.error(err);

    //If prisma can't find record
    if(err.code === 'P2025'){
        return res.status(404).json({
            error: 'NotFoundError',
            message: err.meta?.cause || 'Record not found.',
        });
    }

    return res.status(500).json({
        error: 'InternalServerError',
        message: 'Something are wronging',
    });
};