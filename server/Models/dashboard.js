import mongoose from "mongoose";

const DashBaordData= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    }
})

const DashBoardModel=mongoose.model("DashBaord",DashBaordData)

export default DashBoardModel