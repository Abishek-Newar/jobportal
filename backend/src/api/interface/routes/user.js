import express from "express"
import authMiddleware from "../../lib/authMiddleware.js"
import { addProject, uploadResume } from "../controller/user_controller.js"

export const userRouter = async(router) =>{
    router.post("/user/uploadresume",authMiddleware,uploadResume)
    router.post("/user/addProject",authMiddleware,addProject)

}