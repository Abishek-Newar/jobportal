import express from "express"
import authMiddleware from "../../lib/authMiddleware"
import { addProject, uploadResume } from "../controller/user_controller"

export const userRouter = async(router) =>{
    router.post("/user/uploadresume",authMiddleware,uploadResume)
    router.post("/user/addProject",authMiddleware,addProject)
    
}