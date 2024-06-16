import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { VerificationTokenModel } from "../models/verification_token.model";
import { User } from "../models/user.model";
import { TokenUtils } from "../utils/token.utils";


export class UserController {
    public userService = Container.get(UserService);

    public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const deletedUser: IUser = await this.userService.deleteUser(userId);
            res.status(200).json({ data: deletedUser, message: "deleteUser" });
        } catch (error) {
            next(error);
        }
    }

    public verifyUser = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const email: string = req.params.email;
            const token: string = req.params.token;

            const findToken = await VerificationTokenModel.findOne({ token: token, email: email });
            if (!findToken) {
                return res.status(400).json({ message: "Invalid token" });
            }
            const findUser = await User.findOne({ email: email });
            if (!findUser) {
                return res.status(400).json({ message: "Invalid token" });
            }

            findUser.verifiedAt = new Date();

            findToken.remove();
            await findUser.save();
            return res.status(200).json({ message: "IUser verified" });
        } catch (error) {
            next(error);
        }
    }

    public getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const findUser: IUser = await this.userService.findUserById(userId);
            res.status(200).json({ data: findUser, message: "getUserbyId" });
        } catch (error) {
            next(error);
        }
    }

    public getUserbyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email: string = req.params.email;
            const findUser: IUser = await this.userService.findUserByEmail(email);
            res.status(200).json({ data: findUser, message: "getUserbyEmail" });
        } catch (error) {
            next(error);
        }
    }


    public getCurrentUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = await TokenUtils.getUserIDFromToken(req);
            const findUser: IUser = await User.findById(userId);

            res.status(200).json({ data: findUser, message: "getCurrentUser" });
        } catch (error) {
            next(error);
        }
    }
}