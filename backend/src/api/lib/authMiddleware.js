import jwt from "jsonwebtoken"
import env from "../../infrastructure/env.js"
export default function authMiddleware(){
    const authorization = req.headers.authorization
    const token = authorization.split(" ")[1]
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
        return res.json("error in token")
    }
}