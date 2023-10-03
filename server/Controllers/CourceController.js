import courcemodel from "../Models/CourceModel.js";



export const CourceController= async(req, res)=>{
 
    const cource= new courcemodel(req.body)
    try {

        await cource.save()
        res.status(200).json(cource)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const fetchCource= async (req , res)=>{

    try {
        const data= await courcemodel.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// db.Element.update(
//     { _id: { $in: ['id1', 'id2', 'id3'] } },
//     { $set: { visibility : yourvisibility } },
//     {multi: true}
//  )

export const DeleteCource= async(req,res)=>{
     const id= req.params.id
    try {
        const data= await courcemodel.findByIdAndDelete(id)
        res.status(200).json('Delete Successfully')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const DraftCource=async(req,res)=>{
      const id= req.params.id
    try {

        const data= await courcemodel.findByIdAndUpdate(id,{activeTap:'draft'})

        res.status(200).json('Updated Successfully')
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const courcepublish= async (req,res)=>{

    const id= req.body

    try {
        const data= await courcemodel.updateMany( 
            { _id: { $in: id } },
        { $set: { activeTap : 'publish' } },
        {multi: true})

        res.status(200).json('Updated Successfully')
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const GetOneCource= async(req, res)=>{
    const id= req.params.id 
    try {
    let course= await courcemodel.findById(id)
    res.status(200).json(course)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editcourcedata= async (req, res)=>{
    const courseid = req.params.id;
    const {_id} = req.body;

    console.log(req.body,"bodyyy");
    try {
        let coursesdata= await courcemodel.findById(courseid)

        console.log(coursesdata.id,_id,"courec");

        if (coursesdata.id==_id) {


            await coursesdata.updateOne({ $set: req.body });

            res.status(200).json(coursesdata)
            
        }else{
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}