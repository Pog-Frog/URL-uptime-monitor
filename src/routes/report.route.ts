import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ReportController } from "../controllers/report.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReportDto, UpdateReportDto } from "../models/dtos/report.dto";


export const report_path = "/api/reports";

export class ReportRoute implements Routes {
    public path = report_path;
    public router = Router();
    public reportController = new ReportController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateReportDto), this.reportController.createReport);
        this.router.put(`${this.path}/:reportId`, authMiddleware, validationMiddleware(UpdateReportDto), this.reportController.updateReport);
        this.router.delete(`${this.path}/:reportId`, authMiddleware, this.reportController.deleteReport);
        this.router.get(`${this.path}/:reportId`, authMiddleware, this.reportController.getReportById);
    }
}
