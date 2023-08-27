import { model,Schema } from "mongoose";

const userSchema = new Schema ({
    username: { type: String, require: true, unique: true},
    password: { type: String, require: true},
    role: { type: String, require: true}
})

const User = model("users",userSchema)
export default User