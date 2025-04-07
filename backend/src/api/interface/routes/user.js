import express from "express"
import authMiddleware from "../../lib/authMiddleware.js"
import { addProject, applyJobs, updateProfile, uploadResume, viewAllJobs, ViewJobs } from "../controller/user_controller.js"

export const userRouter = async(router) => {
    router.post("/user/uploadresume", authMiddleware, uploadResume)
    router.post("/user/addProject", authMiddleware, addProject)
    router.post("/user/update-profile", authMiddleware, updateProfile)
    router.get("/user/jobs/all", viewAllJobs)
    router.get("/user/jobs/:name?", ViewJobs)
    router.post("/user/apply/:id", authMiddleware, applyJobs)
}