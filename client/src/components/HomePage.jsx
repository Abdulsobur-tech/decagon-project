import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import book from './book.jpg'
function HomePage() {
  const [courses,setCourses] =useState([])

  useEffect(() =>{
  const  getCourse = async () =>{
    const { data } = await axios.get('http://localhost:3000/api/course/courses')
    setCourses(data)
  }
  getCourse()
  },[])

  const navigate =useNavigate()
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={() => navigate("/registration")} className='submit-btn'>Signin</button> 
      <button onClick={() => navigate("/login")}className='submit-btn'>Login</button>

     
<ul className="ul">
     {courses.map((course,index)=>{
     return  <li key={index}>
  <img className="image" src={book} alt="book" />
<p>Name: {course.title}</p>
<p>Description: {course.description}</p>
<p>Price: {course.price}</p>
      </li>
     })}
     </ul>
    </div>
  )
}

export default HomePage