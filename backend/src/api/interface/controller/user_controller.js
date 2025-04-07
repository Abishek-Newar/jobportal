import { prisma } from "../../config/db.js"
import { projectValidator } from "../../config/helpers/validators.js"
import { fileUpload } from "../model/resume.model.js"


export const uploadResume = async (req, res) => {
    const file = req.file
    try {
        const filename = await fileUpload(file)
        await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                userProfile: {
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
    console.log(req.userId)
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
                    Phone: body.personalDetails?.phone ? body.personalDetails.phone : null,
                    expectedSalary: body.personalDetails?.expectedSalary ? parseFloat(body.personalDetails.expectedSalary) : null,
                    noticePeriod: body.personalDetails?.noticePeriod
                        ? parseInt(body.personalDetails.noticePeriod)
                        : null,
                }
            });
        } else {
            // Update existing profile
            userProfile = await prisma.userProfile.update({
                where: {
                    userId: req.userId
                },
                data: {
                    resumeHeadline: body.profileSummary?.summary || userProfile.resumeHeadline,
                    skills: body.profileSummary?.skills || userProfile.skills,
                    Phone: body.personalDetails?.phone ? body.personalDetails.phone : userProfile.phone,
                    expectedSalary: body.personalDetails?.expectedSalary ? parseFloat(body.personalDetails.expectedSalary) : userProfile.skills.expectedSalary,
                    noticePeriod: body.personalDetails?.noticePeriod
                        ? parseInt(body.personalDetails.noticePeriod)
                        : null,
                }
            });
        }

        // Remove this problematic code block that's causing the error
        // if (body.profileSummary){
        //     await prisma.userProfile.update({
        //         resumeHeadline: body.profileSummary?.summary || userProfile.resumeHeadline,
        //             skills: body.profileSummary?.skills || userProfile.skills
        //     })
        // }

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

export const updateProject = (req, res) => {

}


//adding new project to profile
export const addProject = async (req, res) => {
    const body = req.body
    try {
        const success = projectValidator.safeParse(body)
        if (!success.success) {
            return res.status(403).json({
                msg: "invalid inputs"
            })
        }
        await prisma.project.create({
            data: {
                title: body.title,
                from: body.from,
                to: body.to,
                details: body.details,
                projectLink: body.projectLink,
                userId: req.userId
            }
        })
        res.json({
            msg: "project addded"
        })
    } catch (error) {
        console.log("error while adding project")
        res.status(500).json({
            msg: "error while adding project"
        })
    }
}

export const updateLinks = (req, res) => {

}

export const updateLanguage = (req, res) => {

}

export const updatePublications = (req, res) => {

}

export const ViewJobs = async (req, res) => {
    const data = req.params.name;
    try {
        const jobs = await prisma.job.findMany({
            where:
                data ?
                    {
                        OR: [
                            {
                                title: data
                            }, {
                                location: data
                            }
                        ]
                    } : {}
        })

        res.json(jobs)
    } catch (error) {
        console.log("error while viewing job", error)
        res.json("error while getting jobs")
    }
}

export const viewAllJobs = async (req, res) => {
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

export const applyJobs = async (req, res) => {
    const data = req.params.id
    try {
        // Check if user has already applied
        let user = await prisma.user.findFirst({
            where: {
                id: req.userId
            },
            select: {
                applied: true
            }
        });
        
        // If user has already applied for this job
        if (user.applied && user.applied.includes(data)) {
            return res.status(400).json({
                success: false,
                msg: "You have already applied for this job"
            });
        }
        
        // Add job to user's applied jobs
        let appliedJobs = user.applied || [];
        appliedJobs.push(data);
        
        await prisma.user.update({
            where: {
                id: req.userId
            },
            data: {
                applied: appliedJobs
            }
        });
        
        // Add user to job's appliedBy
        let job = await prisma.job.findFirst({
            where: {
                id: data
            },
            select: {
                appliedBy: true
            }
        });
        
        let appliedBy = job.appliedBy || [];
        appliedBy.push(req.userId);
        
        await prisma.job.update({
            where: {
                id: data 
            },
            data: {
                appliedBy: appliedBy
            }
        });
        
        res.json({
            success: true,
            msg: "Applied to job successfully"
        });
    } catch (error) {
        console.log("error while applying jobs", error);
        res.status(500).json({
            success: false,
            msg: "Error while applying for job"
        });
    }
}

// Add this new function to your user_controller.js

export const getUserApplications = async (req, res) => {
    try {
        // Get the user's applied jobs
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId
            },
            select: {
                applied: true
            }
        });

        if (!user || !user.applied || user.applied.length === 0) {
            return res.json({
                success: true,
                data: []
            });
        }

        // Fetch the job details for each applied job
        const jobs = await prisma.job.findMany({
            where: {
                id: {
                    in: user.applied
                }
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
        console.log("Error fetching user applications:", error);
        res.status(500).json({
            success: false,
            msg: "Error fetching your applications"
        });
    }
};

// Add this function to your user_controller.js file

export const getUserProfile = async (req, res) => {
    try {
        console.log(req.userId)

        const userData = await prisma.user.findUnique({
            where: { id: req.userId },
            include: {
                userProfile: {
                    include: {
                        project: true,
                        Education: true,
                        Links: true,
                        Publications: true,
                        languages: true,
                        experiences: true,
                    },
                },
            },
        });

        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            data: userData,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
        });
    }
};
