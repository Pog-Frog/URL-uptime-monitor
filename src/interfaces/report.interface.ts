export default interface IReport {
    _id: string;
    urlId: string;
    userId: string;
    status?: string;
    availability?: number;
    outages?: number;
    downtime?: number;
    uptime?: number;
    responseTime?: number;
    history?: {
        timestamp: Date;
        status: string;
        responseTime: number;
    }[];
}