const express = require('express');
const connectDb = require("./db");
var signinRouter = require("./routes/signin");
var loginRouter = require("./routes/login");
var homeRouter = require("./routes/home");
var forgotpassword =require('./routes/forgotpassword');
var uploadrouter =require('./routes/upload');
var updaterouter= require('./routes/update');
var getrouter = require('./routes/getallpost');
var deleterouter = require('./routes/delete');
var likerouter = require('./routes/like');
var commentsrouter = require('./routes/comments');

const cors = require("cors");



const app = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin:"*"}));
app.use(express.static("public"));




connectDb();


app.get("/" ,(req,res)=>{
    res.send("hello world");
});

app.use("/signin",signinRouter);
app.use('/login',loginRouter );
app.use('/home',homeRouter);
app.use('/forgotpassword',forgotpassword);
app.use('/upload',uploadrouter);
app.use('/getImage',getrouter)
app.use('/update',updaterouter)
app.use('/delete',deleterouter)
app.use('/like',likerouter)
app.use('/comments',commentsrouter)



app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});
