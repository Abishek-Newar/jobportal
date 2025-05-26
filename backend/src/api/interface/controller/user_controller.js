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
    console.log("Request body:", body);
    console.log("User ID:", req.userId);
    
    try {
        // Check if user profile exists
        let userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: req.userId
            }
        });

        // Update main user table fields (name, email, etc.) if provided
        const userUpdateData = {};
        
        // Handle different possible field names for user data
        if (body.name || body.fullName) {
            userUpdateData.name = body.name || body.fullName;
        }
        if (body.email) {
            userUpdateData.email = body.email;
        }
        
        // Update user table if there's data to update
        if (Object.keys(userUpdateData).length > 0) {
            await prisma.user.update({
                where: {
                    id: req.userId
                },
                data: userUpdateData
            });
            console.log("Updated user data:", userUpdateData);
        }

        // Prepare the data to update/create for userProfile
        const profileData = {
            userId: req.userId,
            // Resume Headline - handle multiple possible sources
            resumeHeadline: body.resumeHeadline || 
                           body.userProfile?.resumeHeadline || 
                           body.profileSummary?.summary || 
                           (userProfile?.resumeHeadline || ''),
            
            // Skills - handle multiple possible sources and formats
            skills: body.skills || 
                   body.userProfile?.skills || 
                   body.profileSummary?.skills || 
                   (userProfile?.skills || []),
            
            // Phone - handle multiple possible sources
            Phone: body.phone || 
                  body.Phone || 
                  body.userProfile?.Phone || 
                  body.personalDetails?.phone || 
                  userProfile?.Phone || null,
            
            // Expected Salary - handle multiple possible sources
            expectedSalary: body.expectedSalary ? parseFloat(body.expectedSalary) :
                           body.userProfile?.expectedSalary ? parseFloat(body.userProfile.expectedSalary) :
                           body.personalDetails?.expectedSalary ? parseFloat(body.personalDetails.expectedSalary) :
                           (userProfile?.expectedSalary || null),
            
            // Notice Period - handle multiple possible sources
            noticePeriod: body.noticePeriod ? parseInt(body.noticePeriod) :
                         body.userProfile?.noticePeriod ? parseInt(body.userProfile.noticePeriod) :
                         body.personalDetails?.noticePeriod ? parseInt(body.personalDetails.noticePeriod) :
                         (userProfile?.noticePeriod || null),
        };

        console.log("Profile data to save:", profileData);

        // If profile doesn't exist, create it
        if (!userProfile) {
            userProfile = await prisma.userProfile.create({
                data: profileData
            });
            console.log("Created new profile:", userProfile);
        } else {
            // Update existing profile
            userProfile = await prisma.userProfile.update({
                where: {
                    userId: req.userId
                },
                data: {
                    resumeHeadline: profileData.resumeHeadline,
                    skills: profileData.skills,
                    Phone: profileData.Phone,
                    expectedSalary: profileData.expectedSalary,
                    noticePeriod: profileData.noticePeriod,
                }
            });
            console.log("Updated profile:", userProfile);
        }

        // Handle education data if provided
        if (body.education && body.education.length > 0) {
            // First, delete existing education records for this user
            await prisma.education.deleteMany({
                where: {
                    userId: userProfile.id
                }
            });
            
            // Then create new education records
            for (const edu of body.education) {
                await prisma.education.create({
                    data: {
                        education: edu.degree || edu.education || '',
                        specialization: edu.field || edu.specialization || '',
                        institute: edu.institution || edu.institute || '',
                        course: edu.degree || edu.course || '',
                        courseType: edu.courseType || 'Full-time',
                        from: new Date(edu.startYear || edu.from),
                        to: edu.current ? new Date() : new Date(edu.endYear || edu.to),
                        userId: userProfile.id
                    }
                });
            }
        }

        // Handle projects data if provided
        if (body.projects && body.projects.length > 0) {
            // First, delete existing project records for this user
            await prisma.project.deleteMany({
                where: {
                    userId: userProfile.id
                }
            });
            
            // Then create new project records
            for (const proj of body.projects) {
                await prisma.project.create({
                    data: {
                        title: proj.title,
                        details: proj.description || proj.details || '',
                        projectLink: proj.link || proj.projectLink || '',
                        from: proj.from ? new Date(proj.from) : new Date(),
                        to: proj.to ? new Date(proj.to) : new Date(),
                        userId: userProfile.id
                    }
                });
            }
        }

        // Handle experiences data if provided
        if (body.experiences && body.experiences.length > 0) {
            // First, delete existing experience records for this user
            await prisma.experience.deleteMany({
                where: {
                    userId: userProfile.id
                }
            });
            
            // Then create new experience records
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
                        userId: userProfile.id
                    }
                });
            }
        }

        // Get the updated user data to return
        const updatedUser = await prisma.user.findUnique({
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
                    }
                }
            }
        });

        res.status(200).json({
            success: true,
            msg: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        console.log("Error updating profile:", error);
        res.status(500).json({
            success: false,
            msg: "Error updating profile",
            error: error.message
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
