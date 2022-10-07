import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Login.css'

function Login() {
  const[email,setEmail] = useState('')
  const [password,setPassword] =useState('')
   const[status ,setStatus] = useState(false)
   const navigate = useNavigate()
  const loginUser = async (e) => {
    e.preventDefault()
    const data ={
    email:email,
    password:password
  }
  // console.log(data);
    await axios.post('http://localhost:3000/api/login',data)
    .then(response => {
      console.log(response.data.message)
      localStorage.setItem("token", response.data.message)
    if(response.status === 200){
       setStatus(true)
    }else{
      setStatus(false)
    }
    }).catch(err => {
      console.log(err);
    })
  }

  function handleSubmit (){
    navigate('/course/admin')
  }
    return (
      <div>
        <h1 className='login-h1'>WELCOME</h1>
        <form onSubmit={loginUser}>
          <label>Enter Your Email:
            <input className='btn' 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            type="text"  placeholder='Please enter your email here'/>
          </label>
          <label>Enter Your Password:
            <input className='btn' 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            type="password"  placeholder='Please enter your password here'/>
          </label>
          <input onClick={status?  handleSubmit : undefined} className='submit-btn' type="submit" />
        </form>
        </div>
      )
}

export default Login