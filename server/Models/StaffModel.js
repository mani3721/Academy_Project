import mongoose from "mongoose";

const StaffSchema= mongoose.Schema({
     
    profile: {
        type: Object
    },
    name: {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location : {
        type: String,
        required: true
    }

})

const StaffModel= mongoose.model("staffModel", StaffSchema)

export default StaffModel