import {Document, model, Schema} from "mongoose";
import {IUser} from "../interfaces/user.interface";


const userSchema: Schema = new Schema({
        name: {type: String, minlength: 3, maxlength: 50, required: [true, 'Name is required']},
        email: {type: String, required: [true, 'Email is required'], unique: true},
        hashedPassword: {type: String, required: [true, 'Password is required']},
        verifiedAt: {type: Date, required: false, default: null},
    },
    {timestamps: true}
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.hashedPassword;
    return obj;
};


export const User = model<IUser & Document>('User', userSchema);