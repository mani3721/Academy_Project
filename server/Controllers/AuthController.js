import AuthModel from '../Models/authmodel.js'
import bcrypt  from 'bcrypt'

import jwt from 'jsonwebtoken'

 

export const signUp= async(req,res)=>{

    const hashedPass= await bcrypt.hash(req.body.password,10)
    req.body.password=hashedPass

    const newStudent= new AuthModel(req.body)

    try {

    const student=await newStudent.save()
      
    const token= jwt.sign({
        name:student.name,
        id:student._id
    },'TALENTO',{expiresIn:'1h'})
        res.status(200).json("Successfully Create a Student Account")
        
    } catch (error) {
        res.status(400).json(error)
    }
    
    
}

export const logIn=async(req,res)=>{

    const {email,password} =req.body

    const student = await AuthModel.findOne({email})
  
    try {

        if (student) {
             const validate= await bcrypt.compare(password, student.password)

             if (!validate) {
                res.status(400).json("Wrong Password")

              }else{
                const token = jwt.sign({
                    email:student.email,
                    id:student._id
                },"TALENTO", {expiresIn:'1h'})
    
                res.status(200).json('Success Login')
            }
        } else{
            res.status(404).json("Student does not exists")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}