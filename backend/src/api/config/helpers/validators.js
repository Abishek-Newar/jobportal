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