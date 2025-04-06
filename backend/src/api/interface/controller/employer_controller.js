import { prisma } from "../../config/db.js";


export const postJobs = async(req,res)=>{
    const body = req.body;
    console.log(body)
    try {
        await prisma.job.create({
            data:{
                title: body.title,
                pay: body.pay,
                jobtype: body.jobtype,
                shift: body.shift,
                location: body.location,
                benefits: body.benefits,
                userId: req.userId,
                jobdescription:{
                    create:{
                        description: body.description,
                        responsibilities: body.responsibilities,
                        requirements: body.requirements,
                        experience: body.experience,
                        worklocation: body.worklocation,
                        deadline : new Date(body.deadline),
                    }
                }
            }
        })
        res.json({
            msg: "Job posted successfully"
        })
    } catch (error) {
        console.log("error while posting jobs",error)
        res.status(500).json({
            msg: "error while posting jobs"
        })
    }
}

export const viewApplications = async(req,res) =>{
    const data = req.params.id;
    try {
        const applicationIds = await prisma.job.findFirst({
            where:{
                id: data
            },
            select:{
                appliedBy: true
            }
        })
        let applications = []
        applicationIds.appliedBy.forEach(async(element) => {
            const user =await prisma.user.findMany({
                where: {
                    id: element
                }
            })
            applications.push(user)
        });

        res.json(applications)
    } catch (error) {
        console.log("error while getting applications",error)
        res.status(500).json({
            msg: "message while getting applications"
        })
    }
}

export const shorlistCandidates = async(req,res) =>{
    const data = req.params.job 
    const body = req.body;
    try {
        let shorlistCandidates = await prisma.job.findFirst({
            where:{
                id: data
            },
            select:{
                shorlistCandidates: true
            }
        })
        shorlistCandidates.shorlistCandidates.push(body.id)
        await prisma.job.update({
            where:{
                id: data
            },
            update:{
                shorlistCandidates:shorlistCandidates
            }
        })
        res.json({
            msg: "candidate shorlisted"
        })
        
    } catch (error) {
        console.log("error while getting candidates",error)
        res.json({
            msg: "error while shorlisting candidates"
        })
    }
}

export const getShorlistedCandidates = async(req,res)=>{
    const data = req.params.id 
    try {
        const candidatesId = await prisma.job.findFirst({
            where: {
                id: data
            },
            select:{
                shorlistCandidates: true
            }
        })
        let candidates = []
        candidatesId.forEach(async(element)=>{
            const candidate = await prisma.user.findFirst({
                where:{
                    id: element 
                }
            })
            candidates.push(candidate)
        })

        res.json(candidates)
    } catch (error) {
        console.log("error while getting shorlisted candidates",error)
        res.status(500).json({
            msg: "error while getting shorlisted candidates"
        })
    }
}

export const getAllJobs = async(req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: req.userId
            },
            include: {
                jobdescription: true
            }
        });
        
        res.json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.log("error while fetching jobs", error);
        res.status(500).json({
            success: false,
            msg: "Error while fetching jobs"
        });
    }
}