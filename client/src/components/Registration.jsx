import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Registration() {

  const [fullname,setFullname] =useState()
  const[email,setEmail] = useState()
  const [phone,setPhone] =useState()
  const [address, setAddress] = useState()
  const [password,setPassword] =useState()
 
const registerUser = async (e) => {
  e.preventDefault()
const data ={
fullname: fullname,
email:email,
phone:phone,
address:address,
password:password
}
await axios.post('http://localhost:3000/api/registration',data)
}

const navigate = useNavigate()

const handleSubmit = event => {
event.preventDefault()
navigate('/course/login')
}



  return (
    <div>
      <h1 className='login-h1'>PLEASE ENTER YOUR DETAILS TO BE MEMBER</h1>
      <form onSubmit={registerUser}>
        <label>Enter your Fullname:
          <input className='btn'
           value={fullname}
           onChange={(e) => setFullname(e.target.value)}
           type="text" 
            placeholder='Please enter your fullname here'/>
        </label>
        <label>Enter your email:
          <input className='btn' 
           value={email}
           onChange={(e) => setEmail(e.target.value)}
          type="text"  placeholder='Please enter your email here'/>
        </label>
        <label>Enter your phone:
          <input className='btn' 
           value={phone}
           onChange={(e) => setPhone(e.target.value)}
          type="number"  placeholder='Please enter your phone here'/>
        </label>
        <label>Enter your address:
          <input className='btn' 
           value={address}
           onChange={(e) => setAddress(e.target.value)}
          type="text"  placeholder='Please enter your address here'/>
        </label>
         <label>Enter your password:
          <input className='btn' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"  placeholder='Please enter your password here'/>
        </label>
        <input className='submit-btn' type="submit" />
      </form>
      </div>
  )
}

export default Registration