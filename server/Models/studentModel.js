import mongoose from "mongoose";

const StudentSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dept:{
        type:String,
        required:true

    }, 
    date:{
        type:String,
        required:true

    }, 
    course:{
        type:String,
        required:true

    }, 
    contactno:{
        type:String,
        required:true

    }, 
    college:{
        type:String,
        required:true
    },
    studentid:{
        type:String,
        required:true
    },
    staff:{
        type:String,
        required:true
    }
})

const StudentModel=mongoose.model("Student",StudentSchema)

export default StudentModel