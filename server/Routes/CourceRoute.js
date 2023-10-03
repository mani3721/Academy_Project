import express from 'express'
import { CourceController, DeleteCource, DraftCource, GetOneCource, courcepublish, editcourcedata, fetchCource } from '../Controllers/CourceController.js'

const router= express.Router()

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       cb(null, req.body.name);
//     },
//   });
// const upload = multer({ storage: storage });


// router.post("/upload", upload.single("file"), (req, res) => {
//     try {
//       return res.status(200).json("File uploded successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   });

router.post("/data", CourceController)
router.get('/get',fetchCource )
router.delete('/delete/:id', DeleteCource)
router.put('/draft/:id', DraftCource)
router.put('/publish', courcepublish)
router.get('/getdata/:id', GetOneCource)
router.put('/edit/:id', editcourcedata)




export default router