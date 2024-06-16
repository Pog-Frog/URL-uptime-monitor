import {Document, model, Schema} from "mongoose";
import {IUrlCheck} from "../interfaces/urlCheck.interface";


const urlCheckSchema: Schema = new Schema({
        name: {type: String, minlength: 3, maxlength: 50, required: [true, 'Name is required']},
        url: {type: String, required: [true, 'URL is required']},
        path: {type: String, required: false},
        userId: {type: Schema.Types.ObjectId, required: [true, 'User ID is required'], ref: 'Users'},
        port: {type: Number, required: false},
        webhook: {type: String, required: false, default: null},
        timeout: {type: Number, required: false, default: 90000},
        interval: {type: Number, required: false, default: 15000},
        threshold: {type: Number, required: false, default: 1},
        authentication: {
            type: {
                username: {type: String, required: false},
                password: {type: String, required: false}
            },
            default: null
        },
        headers: {type: Object, required: false},
        tags: {type: Array, required: false, default: []},
        ignoreSSL: {type: Boolean, required: false, default: true},
        active: {type: Boolean, required: false, default: false},
        handle: {type: Object, required: false}
    },
    {timestamps: true}
);

export const UrlCheck = model<IUrlCheck & Document>('UrlCheck', urlCheckSchema);