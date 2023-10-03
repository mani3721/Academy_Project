import batchmodel from "../Models/addbatchmodel.js";



export const addBatch= async(req, res)=>{

    const batch= new batchmodel(req.body)
    try {

        await batch.save()
        res.status(200).json(batch)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getBatch=async (req, res)=>{

    try {
        const data= await batchmodel.find()
        
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const getbatchbyid= async (req,res)=>{
    const id= req.params.id
    try {

       let getbatchid= await batchmodel.findById(id) 
       
       res.status(200).json(getbatchid)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}