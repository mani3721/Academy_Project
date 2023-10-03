

import AdminModel from '../Models/adminmodel.js'
import bcrypt  from 'bcrypt'
import jwt from 'jsonwebtoken'




export const AdminlogIn=async(req,res)=>{

    const {email,password} =req.body

    const admin = await AdminModel.findOne({email})
  
    try {

        if (admin) {
             const validate= await bcrypt.compare(password, admin.password)

             if (!validate) {
                res.status(400).json("Wrong Password")

              }else{
                const token = jwt.sign({
                    email:admin.email,
                    id:admin._id
                },"TALENTO", {expiresIn:'1h'})
    
                res.status(200).json('Success Login')
            }
        } else{
            res.status(404).json("Admin does not exists")
        }
    } catch (error) {
        res.status(500).json(error);
    }
}