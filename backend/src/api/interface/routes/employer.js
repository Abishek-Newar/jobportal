import express from "express"
import authMiddleware from "../../lib/authMiddleware.js"
import { getShorlistedCandidates, postJobs, shorlistCandidates, viewApplications,getAllJobs } from "../controller/employer_controller.js"

export const employerRouter = async(router) =>{
    router.post("/employee/postjobs",authMiddleware,postJobs)
    router.get("/employee/viewapplications/:id",authMiddleware,viewApplications)
    router.get("/employee/getshortlistedcandidates/:id",authMiddleware,getShorlistedCandidates)
    router.patch("/employee/shorlistCandidates/:id",authMiddleware,shorlistCandidates)
    router.get("/employee/getAllJobs",authMiddleware,getAllJobs)
}