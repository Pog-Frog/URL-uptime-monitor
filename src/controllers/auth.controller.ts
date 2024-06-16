import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { IUser } from "../interfaces/user.interface";
import { AuthService } from "../services/auth.service";

export class AuthController {
    public authService = Container.get(AuthService);

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.body;
            const signUpUserData: IUser = await this.authService.signup(userData);
            res.status(201).json({ data: signUpUserData, message: "signup" });
        } catch (error) {
            next(error);
        }

    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.body;
            const { findUser, cookie, tokenData } = await this.authService.login(userData);
            res.setHeader("Set-Cookie", [cookie]);
            res.status(200).json({ data: findUser, message: "login", token: tokenData.token });
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userData: IUser = req.user;
            const logout_message = await this.authService.logout(userData);
            res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            res.status(200).json({ message: logout_message });
        } catch (error) {
            next(error);
        }
    }
}