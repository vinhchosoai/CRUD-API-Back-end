export class AppError extends Error{
    status : number;
    type : string;
    constructor(type : string ,message : string , status : number = 500){
        super(message);
        this.type = type;
        this.status = status;
        Error.captureStackTrace?.(this, this.constructor);
    }
}