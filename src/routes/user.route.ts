import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { alreadyAuthorizedMiddleware } from "../middlewares/already_authorized.middleware";


export const user_path = "/api/users";

export class UserRoute implements Routes {
    public path = user_path;
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:email`, authMiddleware, this.userController.getUserbyEmail);
        this.router.get(`${this.path}/id/:userId`, this.userController.getUserbyId);
        this.router.delete(`${this.path}/:userId`, authMiddleware, this.userController.deleteUser);
        this.router.get(`${this.path}/verify-email/:email/:token`, alreadyAuthorizedMiddleware, this.userController.verifyUser);
    }
}