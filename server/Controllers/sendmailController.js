import nodemailer from 'nodemailer'
// import meetingLink from "../Models/Sendmailmodel.js";

export const sendmeeting= async (req,res)=>{
 
  const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
      user:'petchimuthuvoc@gmail.com',
      pass:"oylvnjkmxzyldwfw"
    }
  })

  const maillist =[
    'dakaxo9341@bnovel.com'
]

const mailOptions={
  form:'petchimuthuvoc@gmail.com',
  // to:'babotis174@cdeter.com',
  subject:'Urgent: Join the Meeting in 10 Minutes!',
  // text:'Testing Mail'
   html: { path: 'emailhtml/emailformat.html' }// html body
}

maillist.forEach(function(to,i, array){
    
  mailOptions.to=to

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      }else{
          console.log('Email Send'+ info.response + to);
      }
  })

})
  
     
  
}
