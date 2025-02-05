import express from "express"
import { prisma } from "../../config/db"

export const manageUsers = async(req,res) =>{
    try {
        const users = await prisma.user.findMany({
            where:{
                OR:[
                    {
                        type: "user"
                    },
                    {
                        type: "employer"
                    }
                ]
            }
        })
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error while fetching users"
        })
    }
}
