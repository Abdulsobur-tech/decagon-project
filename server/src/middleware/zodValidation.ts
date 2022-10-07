import { z } from "zod";

//Here is the validation for tutor Registration
  const tutorRegValidation = z.object({
    fullname: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    phone:z.string().transform(item=>Number(item)),
    address:z.string(),
    password: z.string().min(5, { message: "Must be  or fewer characters long" })
   })

//Here is the validation for course Registration
   const courseRegValidation = z.object({
    title: z.string(),
    description: z.string(),
     price:z.string().transform(item=>Number(item)),
   })

//Here is the validation for update
   const updatedCourseValidation = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
     price:z.string().transform(item=>Number(item)).optional(),
   })


export {tutorRegValidation,
courseRegValidation,
updatedCourseValidation
}