const express =require('express')
const UploadModel = require('../models/uploads')
const router = express.Router()

router.get('/',(req,res)=>{
    UploadModel.find()
.sort({date:'descending'})
.then((images)=> res.json(images))
.catch((e)=> res.json(e))
})



module.exports =router;
