import { Service } from "typedi";
import { HttpException } from "../exceptions/http.exception";
import { IUrlCheck } from "../interfaces/urlCheck.interface";
import { UrlCheck } from "../models/urlCheck.model";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";


const isValidUrl = (url: string) => {
    const urlPattern = new RegExp("^(https?:\\/\\/)?" + // validate protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
        "(\\#[-a-z\\d_]*)?$", "i"); // validate fragment locator

        return urlPattern.test(url);
}

@Service()
export class UrlCheckService {
    public async createUrlCheck(urlCheckData: IUrlCheck): Promise<IUrlCheck> {
        const findUrlCheck: IUrlCheck = await UrlCheck.findOne({ url: urlCheckData.url });
        if (findUrlCheck) throw new HttpException(409, `The url ${urlCheckData.url} already exists`);

        if (urlCheckData.userId) {
            const findUser: IUser = await User.findById(urlCheckData.userId);
            if (!findUser) throw new HttpException(409, `The user ${urlCheckData.userId} does not exist`);
        }

        if (urlCheckData.webhook) {
            if (!isValidUrl(urlCheckData.webhook)) throw new HttpException(409, `The webhook ${urlCheckData.webhook} is not a valid url`);
        }

        const createdUrlCheck: IUrlCheck = await UrlCheck.create({
            ...urlCheckData
        });

        return createdUrlCheck;
    }

    public async updateUrlCheck(urlCheckId: string, urlCheckData: IUrlCheck): Promise<IUrlCheck> {
        const findUrlCheck: IUrlCheck = await UrlCheck.findById(urlCheckId);
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        const updatedUrlCheck: IUrlCheck = await UrlCheck.findByIdAndUpdate(urlCheckId, { ...urlCheckData }, { new: true });
        if (!updatedUrlCheck) throw new HttpException(409, "UrlCheck not updated");

        return updatedUrlCheck;
    }

    public async deleteUrlCheck(urlCheckId: string): Promise<IUrlCheck> {
        const findUrlCheck: IUrlCheck = await UrlCheck.findById(urlCheckId);
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        const urlCheck: IUrlCheck = await UrlCheck.findById(urlCheckId);
        if (!urlCheck) throw new HttpException(409, "UrlCheck not found");

        await UrlCheck.findByIdAndDelete(urlCheckId);
        return urlCheck;

    }

    public async findUrlCheckById(urlCheckId: string): Promise<IUrlCheck> {
        let findUrlCheck: IUrlCheck = await UrlCheck.findById(urlCheckId);
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        return findUrlCheck;
    }
    
    public async findUrlCheckByName(name: string): Promise<IUrlCheck> {
        let findUrlCheck: IUrlCheck = await UrlCheck.findOne({ name: name });
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        return findUrlCheck;
    }
    public async findUrlCheckByTag(tag: string): Promise<IUrlCheck> {
        let findUrlCheck: IUrlCheck = await UrlCheck.findOne
        ({ tag: tag });
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        return findUrlCheck;
    }

    public async findUrlCheckByUrl(url: string): Promise<IUrlCheck> {
        let findUrlCheck: IUrlCheck = await UrlCheck.findOne({ url: url });
        if (!findUrlCheck) throw new HttpException(409, "UrlCheck not found");

        return findUrlCheck;
    }
}