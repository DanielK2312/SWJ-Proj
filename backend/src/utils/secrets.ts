import dotenv from 'dotenv'
dotenv.config()

export const GOOGLE_CLIENT_ID: string =
  process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID : ''
export const GOOGLE_CLIENT_SECRET: string =
  process.env.GOOGLE_CLIENT_SECRET ? process.env.GOOGLE_CLIENT_SECRET : ''

export const KEY1: string =
  process.env.KEY1 ? process.env.KEY1 : ''
export const KEY2: string =
  process.env.KEY2 ? process.env.KEY2 : ''

export const DB_USERNAME: string =
  process.env.DB_USERNAME ? process.env.DB_USERNAME : ''
export const DB_PASSWORD: string =
  process.env.DB_PASSWORD ? process.env.DB_PASSWORD : ''
export const DB_URL: string =
  process.env.DB_URL ? process.env.DB_URL : ''
export const DB_NAME: string =
  process.env.DB_NAME ? process.env.DB_NAME : ''
