export interface IUser {
    _id: string;
    name: string;
    email: string;
    hashedPassword?: string;
    verifiedAt?: Date;
    created_at?: Date;
    updated_at?: Date;

    toJSON(): string;
}