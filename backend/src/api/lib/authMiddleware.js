import jwt from "jsonwebtoken"
import env from "../../infrastructure/env.js"
export default function authMiddleware(req,res,next){
    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]
    console.log(token)
    try {
        const user = jwt.verify(token,env.JWT_SECRET)
        if(!user.id){
            return res.status(401).json({
                msg: "invalid token"
            })
        }
        next()
    } catch (error) {
        console.log("error in middleware",error)
        return res.status(403).json("error in token")
    }
}