const mongoose =require('mongoose')
placeSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    image:{type:String},
    address:{type:String, required:true},
    location:{
        lat:{type:Number},
        lng:{type:Number}
    },
    creator:{type:mongoose.Types.ObjectId, required:true, ref:'users'}
})


module.exports=mongoose.model("places",placeSchema)