const express= require("express");
const bodyParser= require("body-parser");
const placeRoutes= require("./Routes/place-routes");
const userRoutes= require("./Routes/user-routes");
const httpError = require("./Models/http-error");

const app=express();

app.use(bodyParser.json())

app.use('/api/places',placeRoutes)
app.use('/api/users',userRoutes)
app.use((req,res,next)=>{
    throw new httpError("Could Not Find this Route",404);
})

app.use((error,req,res,next)=>{
    console.log("Hhh")
    if(res.headerSent){
        next(error)
    }
    res.status(error.code || 500)
    res.json({
        message:error.message || "Some thing Wrong"}
    )
})
app.listen(5000)