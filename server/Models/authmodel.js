import mongoose from "mongoose";

const StudentData= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
   
})

const AuthModel= mongoose.model("authstudent", StudentData);
export default AuthModel