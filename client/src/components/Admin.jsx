import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Admin() {
  const [courses,setCourses] =useState([])

  useEffect(() =>{
  const  getCourse = async () =>{
    const { data } = await axios.get('http://localhost:3000/api/course/courses')
    setCourses(data)
  }
  getCourse()
  },[])
  const navigate = useNavigate()

  return (
    <div>
      <h1>Admin page</h1>
      <button onClick={() => navigate("/")} className='submit-btn'>Logout</button>
      <button onClick={() => navigate("/course/registration")} className='submit-btn'>Add Course</button>

     
<ul className="ul">
  {console.log(courses)}
     {courses.map((course,index)=>{
     return  <li key={index}>
        {console.log(course.title)}

<p>Name: {course.title}</p>
<p>Description: {course.description}</p>
<p>Price: {course.price}</p>
<button className='admin-btn'>Edit</button>
<button className='admin-btn'>Delete</button>
       </li>
     })}
     </ul>
    </div>
  )
}

export default Admin