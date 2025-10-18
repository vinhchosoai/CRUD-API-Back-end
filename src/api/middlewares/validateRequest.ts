import { RequestHandler} from "express";
import { AnyZodObject, ZodError  } from 'zod';

export const validateRequest = (schema: AnyZodObject): RequestHandler => (req, _res, next) => {
    try {
        const shape = (schema as any)._def?.shape ? Object.keys((schema as any)._def.shape) : [];
        if (shape.includes('body') || shape.includes('params') || shape.includes('query')) {
            schema.parse({ body: req.body, params: req.params, query: req.query });
        } else {
            schema.parse(req.body);
        }
        return next();
    } catch (err) {
        return next(err instanceof ZodError ? err : err);
    }
};