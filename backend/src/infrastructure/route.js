import express from "express"
import { userRouter } from "../api/interface/routes/user.js"
import { authRouter } from "../api/interface/routes/auth.js"
import { adminRouter } from "../api/interface/routes/admin.js"
import { employerRouter } from "../api/interface/routes/employer.js"


export const createRouter = () =>{
    const router = express.Router()
    userRouter(router)
    authRouter(router)
    adminRouter(router)
    employerRouter(router)
    return router
}