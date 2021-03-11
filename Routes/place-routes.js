const express= require("express");
const {getAllPlaces}=require('../Controller/places')
const {getParticularPlace}=require('../Controller/places')
const {getPlaceByUser}=require('../Controller/places')
const {createPlace}=require('../Controller/places')
// const app=express()

const route=express.Router();


route.get('/',getAllPlaces)
route.get('/:pid',getParticularPlace)
route.get('/user/:uid',getPlaceByUser)
route.post('/',createPlace)


module.exports=route