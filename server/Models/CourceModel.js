import mongoose from "mongoose";

const CourceSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    discription: {
        type: String,
        required: false
    },
    status:{
        type:String,
        required:false
    },
    activeTap:{
        type:String,
        required:true
    }
    
    
})

const courcemodel=mongoose.model("courcemodel",CourceSchema)

export default courcemodel