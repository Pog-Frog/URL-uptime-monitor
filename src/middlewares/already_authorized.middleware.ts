import {NextFunction, Response} from "express";
import {verify} from 'jsonwebtoken';
import {JWT_SECRET} from '../config';
import {DataStoredInToken, RequestWithUser} from "../interfaces/auth.interface";
import {HttpException} from "../exceptions/http.exception";
import {User} from "../models/user.model";
import getAuthorization from "../utils/getAuthorizationFromRequest";


export const alreadyAuthorizedMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const AUTHORIZATION = getAuthorization(req);

        if (!AUTHORIZATION) next();

        const {_id} = await verify(AUTHORIZATION, JWT_SECRET) as DataStoredInToken;

        const findUser = await User.findById(_id);

        if (findUser) {
            next(new HttpException(400, 'You are already authorized'));
        }

        next();
    } catch (error) {
        next();
    }
}