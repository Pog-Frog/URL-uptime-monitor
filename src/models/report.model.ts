import {Document, model, Schema} from "mongoose";
import IReport from "../interfaces/report.interface";


const reportSchema = new Schema({
        urlId: {type: Schema.Types.ObjectId, required: [true, 'URL ID is required'], ref: 'UrlCheck'},
        userId: {type: Schema.Types.ObjectId, required: [true, 'User ID is required'], ref: 'Users'},
        status: {type: String, required: false},
        availability: {type: Number, required: false},
        outages: {type: Number, required: false},
        downtime: {type: Number, required: false},
        uptime: {type: Number, required: false},
        responseTime: {type: Number, required: false},
        history: [{
            timestamp: {type: Date, required: true},
            status: {type: String, required: true},
            responseTime: {type: Number, required: true}
        }]
    },
    {timestamps: true}
);

export const Report = model<IReport & Document>('Report', reportSchema);