import { connect } from "mongoose";
let db_uri="mongodb+srv://hammadbro6:lMs8907@cluster0.4r05eyw.mongodb.net/?retryWrites=true&w=majority"
 const callDb= async()=>{
    try{
        await connect(db_uri)
        console.log ('DB Connected')
    }catch (e) {
        console.log(e)
    }
 }
 export default callDb