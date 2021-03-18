const uuid=require('uuid')
const httpError=require("../Models/http-error")
const {validationResult}=require("express-validator")
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

const getAllPlaces=(req,res,next)=>{
    if(DUMMY_PLACES.length==0){
        const error=new httpError("Couldn't Find Place",401)
        return next(error)
    }
    res.status(200).json({
        place:DUMMY_PLACES
    })
}

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

const createPlace=(req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        throw new httpError("Invalid Input Passed, Please Check your Data",422)
    }
    const {title,description,cordinates,creator}=req.body
    const NEW_PLACE={
        id:uuid(),
        title,
        description,
        location,
        cordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(NEW_PLACE)
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