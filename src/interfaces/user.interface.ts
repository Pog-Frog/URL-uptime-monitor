export interface IUser {
    _id: string;
    name: string;
    email: string;
    password?: string;
    verifiedAt?: Date;
    created_at?: Date;
    updated_at?: Date;

    toJSON(): string;
}