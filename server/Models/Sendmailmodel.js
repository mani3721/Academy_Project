import mongoose from "mongoose";

const meeting = mongoose.Schema({

    meetingLink:{
        type:String,
        required: true
    }
     
})


const meetingLink=mongoose.model('meeting', meeting)

export default meetingLink