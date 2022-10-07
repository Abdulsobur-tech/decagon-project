
import { Request, Response} from "express";
import {tutorRegValidation, courseRegValidation,updatedCourseValidation} from "../middleware/zodValidation";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { PrismaClient } from '@prisma/client'

//Password encryption function
async function encrypt(password: string){
    const salt = await bcrypt.genSalt(10);
    const data = await bcrypt.hash(password, salt)
    return data
}

const prisma = new PrismaClient()
//Here are the functions running on all the routes
class Controller{
    //This is the function handling the Tutor registration
       
async tutorRegistration (req:Request, res:Response){
    try{   
       
         const isValid = tutorRegValidation.safeParse(req.body)
        if(!isValid.success) {
           return res.status(400).json(isValid.error)
        }   
             const tutor = await prisma.tutor.create({data:{
                fullname: isValid.data.fullname,
                email:isValid.data.email,
                phone:isValid.data.phone,
                address:isValid.data.address,
                password: await encrypt(isValid.data.password),
            }})
            
       return  res.status(200).json(tutor)
        }catch(err){
            res.status(400).json({message:"Registration failed" })
        }
        }


// Here is the function handling the login route
 async tutorLogin (req:Request, res:Response){
        try{
            const {email, password} = req.body;
    
            const tutor = await prisma.tutor.findUnique({where: {email}})
            if(!tutor) {
                return res.status(401).json({msg: `User does not exist`});
            }
            let passwordIsValid = {
                email:tutor.email,
                password:tutor.password
            }
              
              if (!bcrypt.compare(password, tutor.password)) {
                return res.status(401)
                  .send({passwordIsValid});
              }
              const token = jwt.sign(
                { id: tutor.id },
                "jwtsecret"
                );
                
    
               res.header("auth-token", token);
               res.status(200).json({message: token})
              
            }catch(err){
                 res.status(404).json({message: "You cannot log in"})
                
            }
        }


//Here is the function for registering  course
async courseRegistration (req:any, res:Response){
        try {
            const isValid = courseRegValidation.safeParse(req.body)
            if(!isValid.success) {
               return res.status(400).json(isValid.error)
            }   
        
            
                 const course = await prisma.course.create({
                    data:{
                        title: isValid.data.title,
                        description:isValid.data.description,
                        price:isValid.data.price,
                        tutorId: req.user.id 
                        
                }
            })
    
            
        res.status(200).json(course)
    
        } catch(e) {
            console.log(e);
            
            return res.json({msg: "Failed to create"})
        }
        }

//Here is the function to get All the registered courses
 async getAllCourses (req:Request, res:Response){
            try {
                const courses = await prisma.course.findMany()
               return res.json(courses)
            } catch (e) {
                return res.json({ msg: "Failed to read", status: 500, route: "/read" })
            }
        }

//Here is the function to get one course
async  getCourse (req:Request, res:Response){
    try{
        const {id} =req.params
    const course = await prisma.course.findUnique({
        where: {
          id: id,
        },
      })
      return res.json(course)
    }catch (e) {
        return res.json({ msg: "Failed to read", status: 500, route: "/read/:id" })
    }
}


// Here is the function Updating Course

async updateCourse(req:Request, res:Response){
    try {
        const {id} =req.params
        const isValid = updatedCourseValidation.safeParse(req.body)
        if(!isValid.success) {
           return res.status(400).json(isValid.error)
        }   
        console.log(isValid);
        
             const course = await prisma.course.update({
                where:{
                    id:id
                },
                data:{
                    title: isValid.data.title,
                    description:isValid.data.description,
                    price:isValid.data.price,
            },
        })
   return res.status(200).json(course)
    } catch(e) {
        return res.json({msg: "Failed to update"})
    }
}

// Here the function to Delete course

 async deleteCourse (req:Request, res:Response){
    try {
        const {id} =req.params;
        const record = await prisma.course.delete({where:{
            id:id
        }})
        if(!record){
         return res.json({msg:"No record  for this id"})
        }
       return res.json({record:"Your Course has been deleted"})
     } catch (e) {
         return res.json({ msg: "Failed to read", status: 500, route: "/delete/:id" })
     }
        }



}

export default new Controller