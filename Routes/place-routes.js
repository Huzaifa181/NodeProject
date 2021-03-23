const express= require("express");
const placeRoutes=require('../Controller/places')
const {check}= require("express-validator");

const route=express.Router();

route.get('/',placeRoutes.getAllPlaces)
route.get('/:pid',placeRoutes.getParticularPlace)
route.patch('/:pid',[
    check('title').  
    not().
    isEmpty(),
    check('description').
    isLength({min:5}),
],placeRoutes.updateParticularPlace)
route.delete('/:pid',placeRoutes.deleteParticularPlace)
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
    check('location').
    not().
    isEmpty(),
    check('creator').
    not().
    isEmpty(),
],placeRoutes.createPlace)

module.exports=route