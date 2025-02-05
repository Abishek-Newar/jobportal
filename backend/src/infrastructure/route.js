import express from "express"
import { userRouter } from "../api/interface/routes/user"
import { authRouter } from "../api/interface/routes/auth"
import { adminRouter } from "../api/interface/routes/admin"
import { employerRouter } from "../api/interface/routes/employer"


export const createRouter = () =>{
    const router = express.Router()
    userRouter(router)
    authRouter(router)
    adminRouter(router)
    employerRouter(router)
    return router
}