const uuid=require('uuid')
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
        id:uuid,
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
        const error=new Error("Could Find Place")
        error.code=401
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
        const error=new Error("Couldn't Find Place for that User")
        error.code=401
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
        const error=new Error("Could Find Place")
        error.code=401
        return next(error)
    }
    res.status(200).json({
        place:identifiedPlace
    })
}


const createPlace=(req,res,next)=>{
    const {title,description,cordinates,creator}=req.body
    const NEW_PLACE={
        id:uuid(),
        title,
        description,
        location,cordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(NEW_PLACE)
    res.status(200).json({
        message:"Place create successfully",
        place:NEW_PLACE
    })
}
exports.getAllPlaces=getAllPlaces
exports.getParticularPlace=getParticularPlace
exports.getPlaceByUser=getPlaceByUser
exports.createPlace=createPlace