const express= require("express");
const placeRoutes=require('../Controller/places')
const {check}= require("express-validator");

const route=express.Router();

route.get('/',placeRoutes.getAllPlaces)
route.get('/:pid',placeRoutes.getParticularPlace)
route.patch('/:pid',placeRoutes.updateParticularPlace)
route.get('/user/:uid',placeRoutes.getPlaceByUser)
route.post('/',[
    check('title').
    not().
    isEmpty(),
    check('description').
    isLength({min:5}),
    check('address').
    not().
    isEmpty(),
],placeRoutes.createPlace)

module.exports=route