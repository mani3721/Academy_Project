import DashBoardModel from "../Models/dashboard.js";

export const getAllDashBoardData= async (req,res)=>{
    try {
      let users = await DashBoardModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const DeleteDashBoardData= async (req, res)=>{
     const id = req.params.id
    try {

      let card = await DashBoardModel.findByIdAndDelete(id)
      res.status(200).json('Delete Successfully')
      
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }