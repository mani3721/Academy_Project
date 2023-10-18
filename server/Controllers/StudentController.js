import DashBoardModel from "../Models/dashboard.js";
import StudentModel from "../Models/studentModel.js";

//StudentData
export const StudentData = async (req, res) => {
  const {
    name,
    email,
    dept,
    date,
    course,
    contactno,
    college,
    studentid,
    staff,
  } = req.body;

  const newStudent = new StudentModel({
    name,
    studentid,
    staff,
    email,
    dept,
    date,
    course,
    contactno,
    college,
  });

  try {
    await newStudent.save();
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all student data

export const getAllStudentData = async (req, res) => {
  try {
    let student = await StudentModel.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete student data

export const deleteStudentData = async (req, res) => {
    const id = req.params.id;
  try {
    const Data = await StudentModel.findById(id);

    await Data.deleteOne();
    res.status(200).json("Student deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

//get oneStudent Data

export const getOneStudent=async (req, res)=>{
  const id=req.params.id

  try {
    const student = await StudentModel.findById(id);
      res.status(200).json(student)
  } catch (error) {
    res.status(500).json(error);
  }
}

export const updatestudentData=async(req, res)=>{
  const studentId = req.params.id;
  const {
    _id,
  } = req.body;



  try {
    const student = await StudentModel.findById(studentId);
   
    if (student.id === _id) {
      await student.updateOne({ $set: req.body });
      res.status(200).json(student);
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }

}

//dashboard card data

export const DashData= async(req, res)=>{
   
  const {title, count}=req.body


  try {
   const Dash= await DashBoardModel.create({
     title,
     count
  })
    res.status(200).json(Dash);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

