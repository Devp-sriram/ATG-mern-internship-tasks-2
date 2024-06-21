const express = require ('express')
const User = require ('../models/User')
const bcrypt = require ('bcrypt')
const { forgotUser } =require ('../controllers/signin')
var router = express.Router()



router.post('/', async (req,res)=>{
try{const sendOtp = await forgotUser(req.body.email) 
        if(sendOtp === false){
             return res.status(400).send({msg:'No account with this email'})
        }else{
            return res.status(200).send({msg:'otp has been sended check the mail'})
        }
    }catch(error){
    console.log(error)
    return res.send(500).send("error in"+ error)
    };


})

router.put('/', async (req, res) => {
    const { email, otp, newPassword } = req.body;
   
    const user = await User.findOne({ email: email,});
    if (!user) {
       return res.status(400).send({ message: "User not found" });
    }
   
    if (user.otp != otp) {
       return res.status(400).send({ message: "Invalid or expired OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.email=email;
    user.password = hashedPassword;
    user.otp = null;
    
    await user.save()
   
    res.send({ message: "Password updated successfully" })
});

module.exports =  router;