import {config} from 'dotenv';


config({path: '.env'});

export const PORT = process.env.PORT || 8080;
export const URL = process.env.URL || 'http://localhost';
export const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017';
export const DB_NAME = process.env.DB_NAME || 'urlmonitor';
export const LOG_FORMAT = process.env.LOG_FORMAT || 'dev';
export const ORIGIN = process.env.ORIGIN || '*';
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const BYCRYPT_SALT = process.env.BYCRYPT_SALT || 10;
export const BYCRYPT_PASSWORD = process.env.BYCRYPT_PASSWORD || 'password';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const MAIL_PROVIDER = process.env.MAIL_PROVIDER || 'Mailtrap';
export const MAIL_HOST = process.env.MAIL_HOST || 'smtp.mailtrap.io';
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_TEMPLATE_LOCATION = process.env.MAIL_TEMPLATE_LOCATION || 'src/views/mail';
export const COMPANY_NAME = process.env.COMPANY_NAME || 'URLMonitor';