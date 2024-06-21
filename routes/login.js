const express =require('express');
const { authenticateUser } = require('../controllers/login');
const User = require('../models/User');
const client =require('../redis')
var router =express.Router();


client
.connect()
.then(()=>{
    console.log('connceted to redis');
})
.catch((error)=>{
    console.log(error)
});

router.get('/',async (req,res)=>{
    const user = await User.find()
    res.status(200).send(user)
})
router.post('/',async (req,res)=>{
   try{const {email,password} = await req.body;
    var loginCredential = await authenticateUser(email,password)
    console.log(loginCredential);
    if(loginCredential === "invalid username or password"){
        res.status(404).send("invalid username or password")
    }else if(loginCredential === 'server busy...'){
        res.status(500).send("server busy...")
    }else {
        res.status(200).json({token:loginCredential.token})
    }
    }catch(e){
        console.log(e);
        res.status(500).send('server busy');
    };
    
})

module.exports =router