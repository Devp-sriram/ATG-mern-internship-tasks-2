const express = require('express');
const {autharizeUser} =require('../controllers/login')
const router =express.Router()




router.get('/',async(req,res)=>{
   try{ const auth_token = req.headers.authorization
    const loginCredentials = await autharizeUser(auth_token)
    if(loginCredentials=== false){
        res.status(400).send('invalid token')
    }else{
        res.json(loginCredentials);
    }
    }catch(error){
        res.status(400).send('server busy')
        console.log(error)
    }
});


module.exports = router;
