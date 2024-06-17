import { IsString, IsNotEmpty, MinLength, IsEmail, MaxLength, IsOptional } from "class-validator";


export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    urlId: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    availability: number;

    @IsString()
    @IsOptional()
    outages: number;

    @IsString()
    @IsOptional()
    downtime: number;

    @IsString()
    @IsOptional()
    uptime: number;

    @IsString()
    @IsOptional()
    responseTime: number;

    @IsString()
    @IsOptional()
    history: [{
        timestamp: Date;
        status: string;
        responseTime: number;
    }];
}

export class UpdateReportDto {
    @IsString()
    @IsOptional()
    urlId: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @IsOptional()
    status: string;

    @IsString()
    @IsOptional()
    availability: number;

    @IsString()
    @IsOptional()
    outages: number;

    @IsString()
    @IsOptional()
    downtime: number;

    @IsString()
    @IsOptional()
    uptime: number;

    @IsString()
    @IsOptional()
    responseTime: number;

    @IsString()
    @IsOptional()
    history: [{
        timestamp: Date;
        status: string;
        responseTime: number;
    }];
}