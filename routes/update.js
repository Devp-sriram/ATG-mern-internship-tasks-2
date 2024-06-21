const express =require('express')
const { upload } =require('../mutlerConfig')
const router =express.Router()
const UploadModel = require('../models/uploads')




  router.put('/:id', upload.single('image'),(req,res)=>{
    if (!req.file) {
    return res.status(400).send('No file uploaded.');
    }
  UploadModel.findByIdAndUpdate(req.params.id, { image: req.file.filename }, { new: true })
  .then(updatedUpload => {
      if (!updatedUpload) {
          return res.status(404).send('No upload found with the given ID.');
      }
      res.send(updatedUpload);
  })
  .catch(e => {
      res.status(500).send(e);
  });
})


module.exports=router;

