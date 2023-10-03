import mongoose from "mongoose";


const addbatchmodel=mongoose.Schema({
  
    batchname: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: String,
        required: false
    },
    end_time:{
        type:String,
        required:false
    },
    students:{
        type:Array,
        required:true
    }
    ,
    coursename:{
        type:String,
        required:true
    }
    ,
    batchtype:{
        type:String,
        required:true
    }
    ,
    staffname:{
        type:String,
        required:true
    }
    ,
    remarks:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:false
    },
    dates:{
        type:Array,
        required:false
    }

})

const batchmodel= mongoose.model('batch', addbatchmodel)


export default batchmodel