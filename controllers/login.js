const User = require("../models/User")
var jwt = require( "jsonwebtoken" );
const bcrypt =require('bcrypt')
const client = require('../redis')
const dotenv = require('dotenv')
dotenv.config()
// const verifyUser =require("../models/verifyUser")

async function CheckUser(email) {
    try {
        const user = await User.findOne({ email : email });
        console.log(user);
        if (user) {
            return true;
        }
        return false;
    } catch(error){
        return "Server Busy", error.message
    }
}

async function authenticateUser(email,password){
    try{
        const userCheck =await User.findOne({email:email})
        const validPassword =await bcrypt.compare(password,userCheck.password)
        console.log(validPassword)
        if(validPassword){
            const token =  jwt.sign({email},process.env.login_secert_token)
            const response = {
                id:userCheck._id,
                username:userCheck.username,
                email:userCheck.email,
                token:token,
                status:true,
            };
        await client.set(`key-${email}`,JSON.stringify(response)) 
           
        await User.findOneAndUpdate(
            {email:userCheck.email},
            {$set:{token:token}},
            {new:true}
        );
        return response;
        }
        return 'invalid username or password'
    }catch(error){
        console.log(error)
        return  'server busy...' , error
    }
}

async function autharizeUser(token){
    try{
        const decodedToken = jwt.verify(token,process.env.login_secert_token)
        if(decodedToken){
            const email = decodedToken.email;
            const auth = await client.get(`key-${email}`);
            if(auth){
                const data =JSON.parse(auth)
                return data 
            }else{
                const data = await User.findOne({ email : email})
                return data
            }
        }
        return false;
    }catch(e){
        console.log(e);
    }
};

    
module.exports = {CheckUser, authenticateUser,autharizeUser};