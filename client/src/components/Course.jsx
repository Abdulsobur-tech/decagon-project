import React,{useState} from 'react'
import axios from 'axios'


function Course() {
  const [title,setTitle] =useState()
  const[description,setDescription] = useState()
  const [price, setPrice] = useState()
const token = localStorage.getItem("token")
const registerCourse = async (e) => {
  e.preventDefault()
  console.log( token )
const data ={
title: title,
description:description,
price:price,
}
await axios.post('http://localhost:3000/api/course/registration',data,{
  headers:{auth: token}
  // headers:{'auth': `Bearer ${token}`}
})
.then(response => {
  console.log(response)
}).catch(err => {
  console.log(err)
})
}



  return (
    <div>
  
      <h1 className='login-h1'>WELCOME YOU CAN ADD A COURSE HERE</h1>
      <form onSubmit={registerCourse}>
        <label>Enter your Title:
          <input className='btn' type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Please enter your title here'/>
        </label>
        <label>Enter your Description:
          <input className='btn' 
          value={description}
          onChange = {(e) =>setDescription(e.target.value)}
          type="text"  placeholder='Please enter your description here'/>
        </label>
        <label>Enter your price:
          <input className='btn' 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"  placeholder='Please enter your price here'/>
        </label>
        <input  className='submit-btn' type="submit" />
      </form>
      </div>
  )
}

export default Course