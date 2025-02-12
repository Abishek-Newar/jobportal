import {PrismaClient} from "@prisma/client"
import AWS from "aws-sdk"
import { env } from "../../infrastructure/env.js"


export const prisma = new PrismaClient()

AWS.config.update({
    accessKeyId: env.AWS_ACCESS_ID,
    secretAccessKey: env.AWS_SECRET_KEY,
    region: "ap-south-1"
})
export const s3 = new AWS.S3()