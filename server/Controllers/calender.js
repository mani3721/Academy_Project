import CalenderModel from "../Models/calenderModel.js";

//insert events
export const Calender = async (req, res) => {

    console.log(req.body);

  const calenderData = new CalenderModel(req.body);

  try {
    await calenderData.save();
    res.status(200).json(calenderData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//getAll Data

export const getAllCalenderData=async (req, res)=>{

    try {

        let events= await CalenderModel.find()

        res.status(200).json(events)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete data

export const deleteCalenderData= async(req, res)=>{

    const id = req.params.id
    
    try {
        let deleteCalender= await CalenderModel.findByIdAndDelete(id)

        res.status(200).json("Events Delete Success")
        
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
}

