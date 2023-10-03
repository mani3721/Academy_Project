import mongoose from "mongoose";

const AdminData= mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    }
   
})

const AdminModel= mongoose.model("adminlogin", AdminData);
export default AdminModel