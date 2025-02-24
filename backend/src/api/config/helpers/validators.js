import zod from "zod"

export const SignupValidator = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
    type: zod.string()
})


export const SigninValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    type: zod.string()
})

export const projectValidator = zod.object({
    title: zod.string(), 
    from: zod.string(),
    to: zod.string(),
    details: zod.string(),
    projectLink: zod.string()
})