const User = require ('../models/User')
const verifyUser =require("../models/verifyUser")
const { sendMail } = require("./SendMail");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


async function InsertVerifyUser(username, email, password){
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = await generateToken(email);


    const newUser = new verifyUser({
      username: username,
      email: email,
      password: hashedPassword,
      token: token,
    });

    const activationLink = `http://localhost:4000/signin/${token}`;
    const content = `<h4>hi,there</h4>
    <h5>welcome to app</h5>
    <P>thankyou for signinup click the below link to activate</p>
    <a href ="${activationLink}" >clink here</a>
    <p>regrads</p>
    <P>Team</p>`;

    await newUser.save();
    sendMail(email, "verifyUser" , content);
    
  } catch (error) {
    console.log(error);
  }  
}
async function generateToken(email) {
      const token = jwt.sign(email, process.env.signup_Secret_Token);
      return token;
}

async function InsertSignupUser(token){
  try {const userVerify = await verifyUser.findOne({token:token})
  if(userVerify){
    const newUser = new User({
      username:userVerify.username,
      email:userVerify.email,
      password:userVerify.password,
      forgetPassword:{}
    });

    await newUser.save();
    await userVerify.deleteOne({token:token})
    const content = `<h4>registration sucess</h4>
    <h5>welcome to app</h5>
    <P>you're registration succesful</p>
    <p>regrads</p>
    <P>Team</p>`;

    sendMail( newUser, "registration succesful" ,content);
    
    return `<h4>registration sucess</h4>
    <h5>welcome to app</h5>
    <P>you're registration succesful</p>
    <p>regrads</p>
    <P>Team</p>`; 
  }
  return`<h4>registration failed</h4>
  <h5> link  is expired......</h5>
  <P>you're registration succesful</p>
  <p>regrads</p>
  <P>Team</p>`;
  }catch(error){
    console.log(error.message)
    return  ` <html>
              <body>
              <h4>registration failed</h4>
              <h5> link  is expired......</h5>
              <P>you're registration succesful</p>
              <p>regrads</p>
              <P>Team</p>
              </body>
              </html>`
 ;
  }; 
}

async function forgotUser(email){
    try{ 
      const user = await User.findOne({email:email})
        if(!user){
        console.log("user not found go and signup as new");
        return false
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        await user.save();

          const content = `<h4>Hi, ${user.username}</h4>
          <h5>Forgot your password?</h5>
          <P>Enter the following verification code to reset your password:</p>
          <h3>${otp}</h3>
          <p>This code will expire in 1 hour.</p>
          <p>Regards</p>
          <P>Team</p>`;

          sendMail(email, 'Reset Password Request', content);
    }catch(error) {
    console.log(error);
    return false
    }
  }

module.exports = {InsertVerifyUser,InsertSignupUser,forgotUser};



 

