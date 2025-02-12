import jwt from "jsonwebtoken"
import { env } from "../../infrastructure/env.js"


export const genToken = async(data)=>{
    const token = jwt.sign(data,env.JWT_SECRET,{
        expiresIn: '10d'
    })

    return token
}





