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