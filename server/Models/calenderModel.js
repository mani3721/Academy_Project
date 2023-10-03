import mongoose from "mongoose";

const CalenderData= mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    dynamic: {
        type: Boolean,
        required: false
    },
    
})

const calendermodel=mongoose.model("calenderData",CalenderData)

export default calendermodel