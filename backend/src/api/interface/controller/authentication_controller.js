import express from "express"
import { SigninValidator, SignupValidator } from "../../config/helpers/validators"
import { prisma } from "../../config/db"
import bcrypt from "bcryptjs"
import { genToken } from "../../lib/jwt.config"


export const SignupController = async(req,res)=>{
    const body = req.body
    const salt = bcrypt.genSalt(10)
    try {
        const success = SignupValidator.safeParse(body)
        if(!success.success){
            return res.status(401).json({
                msg: "invalid inputs"
            })
        }

        const existingUser = await prisma.user.findFirst({
            where:{
                email: body.email 
            }
        })

        if(existingUser){
            return res.status(401).json({
                msg: "user alrady exist"
            })
        }

        const hashedPass = bcrypt.hash(body.password,salt)
        const users = await prisma.user.create({
            data:{
                name: body.name,
                email: body.email,
                password: hashedPass,
                type: body.type
            }
        })
        
        const token = await genToken(users)

        res.json({
            msg: "user cerated",
            token,
            name: users.name,
            type: users.type
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error while creating user"
        })
    }
}

export const SigninController = async(req,res)=>{
    const body = req.body
    try {
        const success = SigninValidator.safeParse(body)
        if(!success.success){
            return res.status(401).json({
                msg: "invalid inputs"
            })
        }
        const users = await prisma.user.findFirst({
            where:{
                email: body.email 
            }
        })

        if(!users){
            return res.status(401).json({
                msg: "user not found"
            })
        }

        const comparePass = await bcrypt.compare(body.password,users.password)

        if(!comparePass){
            return res.json(401).status({
                msg: "invalid password"
            })
        }
        const token = await genToken(users)

        res.json({
            msg: "login successful",
            token,
            name: users.name,
            type: users.type
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "error while creating user"
        })
    }
}