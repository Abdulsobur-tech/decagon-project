import { Router } from "express";
import  Controller from "../controller/controller"
import { auth } from "../middleware/authMiddleware";
const router = Router()

//Tutor Registration Route
router.post('/registration',
Controller.tutorRegistration)
   
//Login Route
router.post('/login',
Controller.tutorLogin
)

//Course Registration Route
router.post('/course/registration',
auth,
Controller.courseRegistration
)


//Route to get all the courses
router.get('/course/courses',
Controller.getAllCourses
)

//Route to get all the courses
router.get('/course/:id',
auth,
Controller.getCourse
)

//For Updating Course
router.patch('/update/:id',
auth,
Controller.updateCourse
)

//For deleting Course
router.delete('/delete/:id',
auth,
Controller.deleteCourse
)


export default router