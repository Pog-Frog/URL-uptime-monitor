import {NextFunction, Request, Response} from "express";
import {HttpException} from "../exceptions/http.exception";


const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            status,
            message
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export default errorMiddleware;