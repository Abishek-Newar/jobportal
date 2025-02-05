import dotenv from "dotenv"
dotenv.config()

export const env = {
    JWT_SECRET: process.env.JWT_SECRET || "Anything",
    PORT: process.env.PORT || 3000,
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID || "",
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "" 
}