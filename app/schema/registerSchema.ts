import * as z from 'zod'

export const registerSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(5, { message: "Minium Length is 5" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Please provide valid email" }),
    password: z.string({ required_error: "Password is required" }).min(5, { message: "Password is required" }),
})


export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Please provide valid email" }),
    password: z.string({ required_error: "Password is required" })
})
