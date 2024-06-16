import {NextFunction, Response} from 'express';
import {verify} from 'jsonwebtoken';
import {JWT_SECRET} from '../config';
import {DataStoredInToken, RequestWithUser} from '../interfaces/auth.interface';
import {HttpException} from '../exceptions/http.exception';
import {User} from '../models/user.model';
import getAuthorization from '../utils/getAuthorizationFromRequest';


export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const AUTHORIZATION = getAuthorization(req);

        if (!AUTHORIZATION) next(new HttpException(401, 'Authentication token missing'));

        const {_id} = await verify(AUTHORIZATION, JWT_SECRET) as DataStoredInToken;

        const findUser = await User.findById(_id);

        if (findUser) {
            req.user = findUser;
            next();
        } else {
            next(new HttpException(401, 'Authentication token is invalid'));
        }

    } catch (error) {
        next(new HttpException(401, 'Authentication token missing or invalid'));
    }
}