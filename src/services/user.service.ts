import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";
import { User } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";


@Service()
export class UserService {
    public async updateUser(userId: string, userData: IUser): Promise<IUser> {
        const findUser: IUser = await User.findById(userId);
        if (!findUser) throw new HttpException(409, "IUser not found");

        const updatedUser: IUser = await User.findByIdAndUpdate(userId, { ...userData }, { new: true });
        if (!updatedUser) throw new HttpException(409, "IUser not updated");

        return updatedUser;
    }

    public async verifyUser(userId: string): Promise<IUser> {
        const findUser = await User.findById(userId);
        if (!findUser) throw new HttpException(409, "IUser not found");

        findUser.verifiedAt = new Date();
        await findUser.save();

        return findUser;
    }

    public async deleteUser(userId: string): Promise<IUser> {
        const findUser: IUser = await User.findById(userId);
        if (!findUser) throw new HttpException(409, "IUser not found");

        const user: IUser = await User.findById(userId);
        if (!user) throw new HttpException(409, "IUser not found");

        await User.findByIdAndDelete(userId);
        return user;

    }

    public async findUserById(userId: string): Promise<IUser> {
        let findUser: IUser = await User.findById(userId).populate('posts').populate('comments');
        const followingCount  = await User.countDocuments({followers: userId});
        if (!findUser) throw new HttpException(409, "IUser not found");

        return findUser;
    }

    public async findUserByEmail(email: string): Promise<IUser> {
        let findUser: IUser = await User.findOne({ email: email }).populate('posts').populate('comments');
        const followingCount  = await User.countDocuments({followers: findUser._id});
        if (!findUser) throw new HttpException(409, "IUser not found");

        return findUser;
    }
}