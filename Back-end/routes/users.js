import { Router } from "express";
import {getUser,bookToBorrow,bookReturn,login,showUser,logout,borrowedBook} from "../controller/user"

const route = Router()

route.get("/",getUser)
route.post("/",bookToBorrow)
route.post("/",bookReturn)
route.post("/",login)
route.get("/",showUser)
route.get("/",logout)
route.get("/",borrowedBook)

export default route;
