import dotenv from 'dotenv'
dotenv.config()

// All secrets are stored in the .env file for as to
// not hardcode secrets in the source code.

export const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : ''
export const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : ''
export const KEY1: string = process.env.KEY1 ? process.env.KEY1 : ''
export const KEY2: string = process.env.KEY2 ? process.env.KEY2 : ''
export const DB_USERNAME = process.env.DB_USERNAME ? process.env.DB_USERNAME : ''
export const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : ''
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : ''
export const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME : ''

export const DB_CONN = 'mongodb+srv://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_URL + '/' + DB_NAME
