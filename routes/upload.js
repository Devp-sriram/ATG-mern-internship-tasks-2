const express = require('express');
const { upload } = require('../mutlerConfig');
const router =express.Router()
const UploadModel = require('../models/uploads');



router.post('/', upload.single('image') , (req, res) => {

  UploadModel.create({image:req.file.filename})
  .then(result => res.json(result))
  .catch(e => console.log(e))
  });

module.exports = router;