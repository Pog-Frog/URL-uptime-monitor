import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";
import IReport from "../interfaces/report.interface";
import { Report } from "../models/report.model";


@Service()
export class ReportService {
    public async createReport(reportData: IReport): Promise<IReport> {
        const findReport: IReport = await Report.findOne({ urlId: reportData.urlId });
        if (findReport) throw new HttpException(409, `The report ${reportData.urlId} already exists`);

        const createdReport: IReport = await Report.create({
            ...reportData
        });

        return createdReport;
    }

    public async updateReport(reportId: string, reportData: IReport): Promise<IReport> {
        const findReport: IReport = await Report.findById(reportId);
        if (!findReport) throw new HttpException(409, "Report not found");

        const updatedReport: IReport = await Report.findByIdAndUpdate(reportId, { ...reportData }, { new: true });
        if (!updatedReport) throw new HttpException(409, "Report not updated");

        return updatedReport;
    }

    public async deleteReport(reportId: string): Promise<IReport> {
        const findReport: IReport = await Report.findById(reportId);
        if (!findReport) throw new HttpException(409, "Report not found");

        const report: IReport = await Report.findById(reportId);
        if (!report) throw new HttpException(409, "Report not found");

        await Report.findByIdAndDelete(reportId);
        return report;

    }

    public async findReportById(reportId: string): Promise<IReport> {
        let findReport: IReport = await Report.findById(reportId);
        if (!findReport) throw new HttpException(409, "Report not found");

        return findReport;
    }
    
}