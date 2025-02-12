import express from "express"
import { SigninController, SignupController } from "../controller/authentication_controller.js"


export const authRouter = (router)=>{
    router.post("/auth/signin",SigninController)
    router.post("/auth/signup",SignupController)
}