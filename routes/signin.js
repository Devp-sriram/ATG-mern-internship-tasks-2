const express = require("express");
const { CheckUser } = require("../controllers/login")
const { InsertVerifyUser, InsertSignupUser } = require("../controllers/signin")
var router = express.Router();

router.get("/:token", async ( req , res) => {
    try{
        const response =await InsertSignupUser(req.params.token)
        res.status(200).send(response);
    }catch(err){
        console.log(err)
        res.status(500).send(
        `<html>
        <body>
        <h4> registration failed</h4>
        <h5> link  is expired......</h5>
        <p>regrads</p>
        <P>Team</p>
        </body>
        </html>`)
    }
});

router.post("/verify", async (req, res) => {
    try {
        const { username, email, password } = await req.body;
        console.log(username, email, password);
        const registerCredentials = await CheckUser(email);
        if (registerCredentials === false) {
            await InsertVerifyUser(username, email, password)
            res.status(200).send(true)
        } else if (registerCredentials === true) {
            res.status(200).send(false)
        } else if (registerCredentials === "Server Busy"){
            res.status(503).send('Service Unavailable')
        }} catch (error) {
        console.log(error);
        res.send(500).send("error in"+ error)
    }
});


module.exports = router ;