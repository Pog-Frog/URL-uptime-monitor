import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import IReport from "../interfaces/report.interface";
import { ReportService } from '../services/report.service';


export class ReportController {
    public reportService = Container.get(ReportService);

    public createReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportData: IReport = req.body;
            const createReportData: IReport = await this.reportService.createReport(reportData);
            res.status(201).json({ data: createReportData, message: "createReport" });
        } catch (error) {
            next(error);
        }
    }

    public updateReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportId: string = req.params.reportId;
            const reportData: IReport = req.body;
            const updateReportData: IReport = await this.reportService.updateReport(reportId, reportData);
            res.status(200).json({ data: updateReportData, message: "updateReport" });
        } catch (error) {
            next(error);
        }
    }

    public deleteReport = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportId: string = req.params.reportId;
            const deleteReportData: IReport = await this.reportService.deleteReport(reportId);
            res.status(200).json({ data: deleteReportData, message: "deleteReport" });
        } catch (error) {
            next(error);
        }
    }

    public getReportById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reportId: string = req.params.reportId;
            const findReportData: IReport = await this.reportService.findReportById(reportId);
            res.status(200).json({ data: findReportData, message: "getReportById" });
        } catch (error) {
            next(error);
        }
    }
}