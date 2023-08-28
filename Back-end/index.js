import express, {json} from "express";
import callDb from "./helpers/db";
import User from "./models/user";



const app= express
app.use(json())
app.use((req,res) => {
    return res.status(404).json({err:"router not found"})
})
app.use((err,req,res,next)=>{
console.error("Error:",err)
return res.status(500).json(({err:"Unknown server error"}))
})

callDb()
.then(async()=>{
    const admin = await User.findOne({username:"admin"})
    if (admin == null){
        await User.create({username:"",password:"",role:"admin"})
    }
    const student= await User.findById(id)
    if (student == null){
        await User.create({username:"",password:"",role:"student"})
    }
})
.then (()=>{app.listen(5000)})
.catch((err)=>{
    console.err("Failed to connect to database",err)
})