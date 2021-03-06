const connectDb=require('./config/db')
const express= require("express");
const bodyParser= require("body-parser");
const userRoutes= require("./Routes/user-routes");
const placeRoutes= require("./Routes/place-routes");
const httpError = require("./Models/http-error");
const fs=require('fs')
const path=require('path')

connectDb();

const app=express();

app.use(bodyParser.json())

//static showing the image file in the browser

app.use('uploads/images',express.static(path.join('uploads','images')))

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept, Authorization")
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
    next()
})


app.use('/api/places',placeRoutes)
app.use('/api/users',userRoutes)
app.use((req,res,next)=>{
    throw new httpError("Could Not Find this Route",404);
})

app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path,(err)=>{
            console.log(err)
        })
    }
    if(res.headerSent){
        next(error)
    }
    res.status(error.code || 500)
    res.json({
        message:error.message || "Some thing Wrong"}
    )
})
app.listen(5000)