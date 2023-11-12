import dotenv from "dotenv";
dotenv.config();

export const DB_MONGOATLAS=process.env.DB_MONGOATLAS

export const API_NAME_CLOUD=process.env.API_NAME_CLOUD
export const API_KEY_CLOUD=process.env.API_KEY_CLOUD
export const API_KEY_SECRET=process.env.API_KEY_SECRET


export const dbSecretFields=['__v','password']
export const SESSION_SECRET=process.env.SESSION_SECRET








