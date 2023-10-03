import StaffModel from "../Models/StaffModel.js";



export const StaffData= async (req, res)=>{
     const StaffData= await new StaffModel(req.body)
    try {

      await StaffData.save()
        res.status(200).json(StaffData)
    } catch (error) {
        res.status(500).json(error)
    }

}

export const getAllStaffDatas= async (req, res)=>{
    
    try {
        let staff= await StaffModel.find();
        res.status(200).json(staff)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const fetchStaffData= async (req, res)=>{
    const id= req.params.id 
    try {
    let staff= await StaffModel.findById(id)
    res.status(200).json(staff)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateStaffData= async(req, res)=>{

    const staffId = req.params.id;
    const {_id} = req.body;
   
    try {
        const staffData= await StaffModel.findById(staffId)
        console.log(staffData.id);
        if (staffData.id==_id ) {
            await staffData.updateOne({ $set: req.body });
            res.status(200).json(staffData)
        }else {
            res.status(403).json("Action forbidden");
        }
       
        
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteStaff= async(req, res)=>{
    const id = req.params.id;
    try {
        const staff= await StaffModel.findByIdAndDelete(id)
        res.status(200).json('Delete Success')
    } catch (error) {
         res.status(500).json(error)
    }
}