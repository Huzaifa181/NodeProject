const mongoose =require('mongoose')
placeSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    address:{type:String, required:true},
    creator:{type:String, required:true}
})


module.exports=mongoose.model("places",placeSchema)