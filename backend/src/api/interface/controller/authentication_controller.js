import bcrypt from "bcryptjs"
import { prisma } from "../../config/db.js"
import { SigninValidator, SignupValidator } from "../../config/helpers/validators.js"
import { genToken } from "../../lib/jwt.config.js"


export const SignupController = async(req,res)=>{
    const body = req.body
    const salt = bcrypt.genSalt(10)
    console.log(body)
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

        const hashedPass = await bcrypt.hash(body.password,10)
        console.log(hashedPass);
        const users = await prisma.user.create({
            data:{
                name: body.name,
                email: body.email,
                password: hashedPass,
                type: body.type,
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
    console.log(body)
    try {
        const success = SigninValidator.safeParse(body)
        console.log(success);
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
        console.log(users);
        if(!users){
            return res.status(401).json({
                msg: "user not found"
            })
        }

        const comparePass = await bcrypt.compare(body.password,users.password)
        console.log(comparePass);
        if(!comparePass){
            return res.status(401).json({
                msg: "invalid password"
            })
        }
        const token = await genToken(users)
        console.log(token)
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