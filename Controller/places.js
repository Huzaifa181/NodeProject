const httpError=require("../Models/http-error")
const Place=require('../Models/places')
const {validationResult}=require("express-validator")

const getPlaceByUser=async (req,res,next)=>{
    const id=req.params.uid
    let identifiedPlace;
    try{
        identifiedPlace=await Place.find({creator:id})
    }
    catch(err){
        const error=new httpError("Fatching Places Failed, Could not find place",401)
        return next(error)
    }
    if(!identifiedPlace || identifiedPlace.length==0){
        const error=new httpError("Couldn't Find Place for that User",401)
        return next(error)
    }
    res.status(200).json({
        place:identifiedPlace.map(place=>place.toObject({getters:true}))
    })
}

const getParticularPlace=async (req,res,next)=>{
    const id=req.params.pid
    let identifiedPlace;
    try{
        identifiedPlace=await Place.findById(id)
    }
    catch(err){
        const error=new httpError("Spmething went wrong, Could not Find Place",500)
        return next(error)
    }
    if(!identifiedPlace){
        const error=new httpError("Could not Find Place fro the particular id",404)
        return next(error)
    }
    res.status(200).json({
        place:identifiedPlace.toObject({getters:true})
    })
}

const getAllPlaces=async (req,res,next)=>{
    let data
    try{
        data=await Place.find().exec();
    }
    catch(err){
        const error=new httpError("Could not Find Places",500)
        return next(error)
    }
    if(data.length==0){
        const error=new httpError("No Place",201)
        return next(error)
    }
    res.status(201)
    res.json({
        message:"Successful",
        data:data
    })
}

const createPlace=async (req,res,next)=>{
    const error=validationResult(req)
    if(!error.isEmpty()){
        const error= new httpError("Invalid Input Passed, Please Check your Data",422)
        return next(error)
    }

    try{
        const createProduct=await new Place({
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            image:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fnature&psig=AOvVaw2UPOioHspiliguPXwy1UXd&ust=1616558351570000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjW6aTDxe8CFQAAAAAdAAAAABAD",
            address:req.body.address,
            creator:req.body.creator
        })
        const result=await createProduct.save()
    }
    catch (err){
        const error=new httpError("Could not store data",500)
        return next(error)
    }
    res.status(200)
    res.json({
        message:'Place Create Successfully',
        data:result
    })
}

const updateParticularPlace=async (req,res,next)=>{
    const {title, description}=req.body
    const pid=req.params.pid
    let place;
    try{
        place=await Place.findById(pid)
    }
    catch(err){
        const error=new httpError("Could not Find Places",500)
        return next(error)
    }
    place.title=title
    place.description=description
    try{
        console.log(place);
        place=await place.save();
    }
    catch(err){
        const error=new httpError("Something went wrong, Could not Update place",500)
        return next(error)
    }
    res.status(200).json({
        message:"Updated Successfully",
        place:place.toObject({getters:true})
    })
}
const deleteParticularPlace=async (req,res,next)=>{
    const {title, description}=req.body
    const pid=req.params.pid
    let place;
    try{
        place=await Place.findById(pid)
    }
    catch(err){
        const error=new httpError("Could not Find Places",500)
        return next(error)
    }
    place.title=title
    place.description=description
    try{
        console.log(place);
        place=await place.remove();
    }
    catch(err){
        const error=new httpError("Something went wrong, Could not Update place",500)
        return next(error)
    }
    res.status(200).json({
        message:"Deleted Successfully",
        place:place.toObject({getters:true})
    })
}

exports.getAllPlaces=getAllPlaces
exports.getParticularPlace=getParticularPlace
exports.updateParticularPlace=updateParticularPlace
exports.deleteParticularPlace=deleteParticularPlace
exports.getPlaceByUser=getPlaceByUser
exports.createPlace=createPlace