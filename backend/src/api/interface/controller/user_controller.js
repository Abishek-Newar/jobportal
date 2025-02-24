import { prisma } from "../../config/db"
import { projectValidator } from "../../config/helpers/validators"
import { fileUpload } from "../model/resume.model"


export const uploadResume = async(req,res) =>{
    const file = req.file 
    try {
        const filename = await fileUpload(file)
        await prisma.user.update({
            where:{
                id: req.userId 
            },
            data:{
                userProfile:{
                    resume: filename
                }
            }
        })
        res.json({
            msg: "resume uploaded"
        })
    } catch (error) {
        console.log("error while uploading file", error)
        res.json({
            msg: "error while uploading resume"
        })
    }
}

export const updateProfile = (req,res) =>{
    
}

export const updateProject = (req,res) =>{
    
}


//adding new project to profile
export const addProject = async(req,res)=>{
    const body = req.body 
    try {
        const success =  projectValidator.safeParse(body)
        if(!success.success){
            return res.status(403).json({
                msg: "invalid inputs"
            })
        }
        await prisma.project.create({
            data:{
                title:body.title, 
                from:body.from,
                to: body.to,
                details: body.details,
                projectLink: body.projectLink,
                userId: req.userId
            }
        })
        res.json({
            msg:"project addded"
        })
    } catch (error) {
        console.log("error while adding project")
        res.status(500).json({
            msg: "error while adding project"
        })
    }
}

export const updateLinks = (req,res) =>{
    
}

export const updateLanguage = (req,res) =>{
    
}

export const updatePublications = (req,res) =>{
    
}

export const ViewJobs = async(req,res) =>{
    const data = req.params.name;
    try {
        const jobs = await prisma.job.findMany({
            where:{
                OR:[
                    {
                        title: data
                    },{
                        location: data
                    }
                ]
            }
        })

        res.json(jobs)
    } catch (error) {
        console.log("error while viewing job",error)
        res.json("error while getting jobs")
    }
}

export const applyJobs = async(req,res)=>{

}

