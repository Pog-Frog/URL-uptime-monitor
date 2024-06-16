import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { JWT_SECRET } from '../config';
import { HttpException } from '../exceptions/http.exception';
import { User } from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { sendEmailVerification } from "../utils/emailer";
import { VerificationTokenModel } from '../models/verification_token.model';


const createToken = (user: IUser): TokenData => {
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const DataStoredInToken: DataStoredInToken = {
        _id: user._id
    };
    return {
        expiresIn,
        token: sign(DataStoredInToken, JWT_SECRET, { expiresIn })
    };
}

const creatHTTPCookie = (tokenData: TokenData): string => {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
}

@Service()
export class AuthService {
    public async signup(userData: IUser): Promise<IUser> {
        const findUser: IUser = await User.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `The email ${userData.email} already exists`);

        const findUsername: IUser = await User.findOne({ name: userData.name });
        if (findUsername) throw new HttpException(409, `The name ${userData.name} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createdUser: IUser = await User.create({
            ...userData,
            password: hashedPassword
        });

        const token = sign({ _id: createdUser._id }, JWT_SECRET, { expiresIn: '30m' });
        await sendEmailVerification(createdUser.name, createdUser.email, token).catch((err) => {
            throw new HttpException(409, "Email Verification not sent");
        }).then(async () => {
            const verificationToken = await VerificationTokenModel.create({
                token: token,
                email: createdUser.email
            }).catch((err) => {
                throw new HttpException(409, "Email Verification not sent");
            });
        });

        return createdUser;
    }

    public async login(userData: IUser): Promise<{ findUser: IUser; cookie: string; tokenData: TokenData }> {
        const findUser: IUser = await User.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `The email you entered doesn't belong to an account.`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Invalid email or password");

        if (!findUser.verifiedAt) throw new HttpException(409, "Please verify your email");

        const tokenData = createToken(findUser);
        const cookie = creatHTTPCookie(tokenData);

        return { findUser, cookie, tokenData };
    }

    public async logout(userData: IUser) {
        const findUser: IUser = await User.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `The email you entered doesn't belong to an account.`);

        return "Logged out successfully";
    }
}