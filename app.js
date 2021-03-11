const express= require("express");
const bodyParser= require("body-parser");
const placeRoutes= require("./Routes/place-routes");
const app=express()

app.use(bodyParser.json())

app.use('/api/places',placeRoutes)

app.use((error,req,res,next)=>{
    if(res.headerSent){
        next(error)
    }
    res.status(error.code || 500)
    res.json({
        message:error.message || "Some thing Wrong"}
    )
})

app.listen(5000)