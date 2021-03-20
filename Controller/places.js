const  MongoClient  = require("mongodb").MongoClient
const httpError=require("../Models/http-error")
const {validationResult}=require("express-validator")
var url="mongodb+srv://Huzaifa:Hanzala12@cluster0.n82wf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let DUMMY_PLACES=[
    {
        id:'p1',
        title:"London",
        description:'Good Place',
        location:{
            lat:30.83838,
            lon:-87.2837
        },
        address:'Street No 102',
        creator:'u1'
    },
    {
        id:'p2',
        title:"London",
        description:'Good Place',
        location:{
            lat:30.83838,
            lon:-87.2837
        },
        address:'Street No 102',
        creator:'u1'
    },
]


const getPlaceByUser=(req,res,next)=>{
    const id=req.params.uid
    console.log(id)
    const identifiedPlace=DUMMY_PLACES.filter(place=>place.creator==id)
    if(!identifiedPlace || identifiedPlace.length==0){
        const error=new httpError("Couldn't Find Place for that User",401)
        return next(error)
    }
    res.status(200).json({
        place:identifiedPlace
    })
}

const getParticularPlace=(req,res,next)=>{
    const id=req.params.pid
    console.log(id)
    const identifiedPlace=DUMMY_PLACES.find(place=>place.id===id)
    if(!identifiedPlace){
        const error=new httpError("Could Find Place",401)
        return next(error)
    }
    res.status(200).json({
        place:identifiedPlace
    })
}

const getAllPlaces=async (req,res,next)=>{
    const client= new MongoClient(url,{ useUnifiedTopology: true });
    try{
        console.log("jsss")
        await client.connect();
        console.log("jss")
        const db= client.db();
        console.log("js")
        result=await db.collection("myFirstDatabase").find().toArray();
        console.log(result)
    }
    catch(error){
        return res.json(({message:"could not store data"}))
    }
    client.close();
    if(DUMMY_PLACES.length==0){
        const error=new httpError("Couldn't Find Place",401)
        return next(error)
    }
    res.status(200).json(result)
}
const createPlace=async (req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        const error= new httpError("Invalid Input Passed, Please Check your Data",422)
        return next(error)
    }
    const NEW_PLACE={
        title:req.body.title,
        description:req.body.description,
        cordinates:req.body.cordinates,
        address:req.body.address,
        creator:req.body.creator
    }
    
    const client= new MongoClient(url)
    try{
        console.log("jjjhjs")
        await client.connect();
        const db= client.db();
        console.log("jhjs")
        const result=await db.collection("myFirstDatabase").insertOne(NEW_PLACE);
        console.log("sam")
    }
    catch (error){
        console.log("jk")
        return res.json(({message:"could not store data "}))
    }
    client.close();
    res.status(200).json({
        message:"Place create successfully",
        place:NEW_PLACE
    })
}

const updateParticularPlace=(req,res,next)=>{
    const {title, description}=req.body
    const pid=req.params.pid
    const updatedPlace={...DUMMY_PLACES.find(data=>data.id==pid)}
    const updatedPlaceIndex=DUMMY_PLACES.findIndex(data=>data.id==pid)
    console.log(updatedPlace)
    updatedPlace.title=title
    updatedPlace.description=description
    DUMMY_PLACES[updatedPlaceIndex]=updatedPlace
    res.status(200).json({
        message:"Updated Successfully",
        place:updatedPlace
    })
}

exports.getAllPlaces=getAllPlaces
exports.getParticularPlace=getParticularPlace
exports.updateParticularPlace=updateParticularPlace
exports.getPlaceByUser=getPlaceByUser
exports.createPlace=createPlace