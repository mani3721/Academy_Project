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


export const updateBatch= async (req, res)=>{
    const id= req.params.id

    const {_id}= req.body

    try {

        let updateBatch= await batchmodel.findById(id)

        if (updateBatch.id==_id) {
             
            await updateBatch.updateOne({$set:req.body})

            res.status(200).json(updateBatch)
        }else {
            res.status(403).json("Action forbidden");
        }
        
    } catch (error) {
        res.status(500).json(error);
    }



}

export const deleteBatch=async(req, res)=>{
    const id= req.params.id

    try {
        let deleteBatch= await batchmodel.findByIdAndDelete(id)
        res.status(200).json('Delete Successfully')
    } catch (error) {
        res.status(500).json(error);
    }
}