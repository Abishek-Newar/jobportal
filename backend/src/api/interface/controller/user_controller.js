import { prisma } from "../../config/db.js"
import { projectValidator } from "../../config/helpers/validators.js"
import { fileUpload } from "../model/resume.model.js"


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

export const updateProfile = async (req, res) => {
    const body = req.body;
    console.log(body)
    try {
        // Check if user profile exists
        let userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: req.userId
            }
        });

        // If profile doesn't exist, create it
        if (!userProfile) {
            userProfile = await prisma.userProfile.create({
                data: {
                    userId: req.userId,
                    resumeHeadline: body.profileSummary?.summary || '',
                    skills: body.profileSummary?.skills || [],
                    Phone: body.phone ? parseInt(body.phone) : null,
                    expectedSalary: body.expectedSalary ? parseInt(body.expectedSalary) : null,
                    noticePeriod: body.noticePeriod ? parseInt(body.noticePeriod) : null
                }
            });
        } else {
            // Update existing profile
            userProfile = await prisma.userProfile.update({
                where: {
                    userId: userProfile.id
                },
                data: {
                    resumeHeadline: body.profileSummary?.summary || userProfile.resumeHeadline,
                    skills: body.profileSummary?.skills || userProfile.skills,
                    Phone: body.phone ? parseInt(body.phone) : userProfile.Phone,
                    expectedSalary: body.expectedSalary ? parseInt(body.expectedSalary) : userProfile.expectedSalary,
                    noticePeriod: body.noticePeriod ? parseInt(body.noticePeriod) : userProfile.noticePeriod
                }
            });
        }

        // Handle education data if provided
        if (body.education && body.education.length > 0) {
            for (const edu of body.education) {
                await prisma.education.create({
                    data: {
                        education: edu.degree || '',
                        specialization: edu.field || '',
                        institute: edu.institution || '',
                        course: edu.degree || '',
                        courseType: 'Full-time', // Default value
                        from: new Date(edu.startYear, 0, 1),
                        to: edu.current ? new Date() : new Date(edu.endYear, 0, 1),
                        userId: userProfile.id // Use userProfile.id instead of req.userId
                    }
                });
            }
        }

        // Handle projects data if provided
        if (body.projects && body.projects.length > 0) {
            for (const proj of body.projects) {
                await prisma.project.create({
                    data: {
                        title: proj.title,
                        details: proj.description || '',
                        projectLink: proj.link || '',
                        from: new Date(),
                        to: new Date(),
                        userId: userProfile.id // Use userProfile.id instead of req.userId
                    }
                });
            }
        }

        // Handle experiences data if provided
        if (body.experiences && body.experiences.length > 0) {
            for (const exp of body.experiences) {
                await prisma.experience.create({
                    data: {
                        title: exp.title,
                        company: exp.company,
                        location: exp.location || '',
                        description: exp.description || '',
                        startDate: new Date(exp.startDate),
                        endDate: exp.current ? null : new Date(exp.endDate),
                        current: exp.current || false,
                        userId: userProfile.id // Use userProfile.id instead of req.userId
                    }
                });
            }
        }

        res.status(200).json({
            success: true,
            msg: "Profile updated successfully"
        });
    } catch (error) {
        console.log("Error updating profile:", error);
        res.status(500).json({
            success: false,
            msg: "Error updating profile"
        });
    }
};

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
            where:
                data?
                {OR:[
                    {
                        title: data
                    },{
                        location: data
                    }
                ]}: {}
        })

        res.json(jobs)
    } catch (error) {
        console.log("error while viewing job",error)
        res.json("error while getting jobs")
    }
}

export const viewAllJobs = async(req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            include: {
                jobdescription: true
            }
        });
        
        res.json({
            success: true,
            data: jobs
        });
    } catch (error) {
        console.log("error while fetching all jobs", error);
        res.status(500).json({
            success: false,
            msg: "Error while fetching all jobs"
        });
    }
}

export const applyJobs = async(req,res)=>{
    const data = req.params.id 
    try {
        let appliedJobs = await prisma.user.findFirst({
            where:{
                id: req.userId
            },
            select:{
                applied: true
            }
        })
        appliedJobs.appliedJobs.push(data)
        await prisma.user.update({
            where:{
                id: req.userId
            },
            data:{
                applied:appliedJobs
            }
        })
        let appliedBy = await prisma.job.findFirst({
            where:{
                id: data
            }
        })
        appliedBy.appliedBy.push(req.userId)
        await prisma.job.update({
            where:{
                id: data 
            },
            data:{
                appliedBy:appliedBy
            }
        })
        res.json({
            msg:"applied to job"
        })
    } catch (error) {
        console.log("error while applying jobs",error)
        res.status(500).json({
            msg: "error while applying jobs"
        })
    }
}

