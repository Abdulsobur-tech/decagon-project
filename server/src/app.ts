import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import  router from './route/router'
const app =express()


 dotenv.config();


app.use(express.json())

let corsOptions = {
    origin : ['http://localhost:3001'],
 }
 app.use(cors(corsOptions)) 

app.use('/api',router)


 const port = 3000





app.listen(port, ()=> {
    console.log(`app listening on ${port}`);
    
})

export default app