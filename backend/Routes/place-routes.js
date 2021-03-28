const express= require("express");
const placeRoutes=require('../Controller/places');
const {check}= require("express-validator");
const {fileUpload}=require('../midllewares/file-upload')
const checkAuth=require('../midllewares/check-auth');
const route=express.Router();

route.get('/',placeRoutes.getAllPlaces);
route.get('/:pid',placeRoutes.getParticularPlace);
route.get('/user/:uid',placeRoutes.getPlaceByUser);
route.use(checkAuth);
route.patch('/:pid',[
    check('title').
    not().
    isEmpty(),
    check('description').
    isLength({min:5}),
],placeRoutes.updateParticularPlace)
route.delete('/:pid',placeRoutes.deleteParticularPlace);
route.post('/',
    fileUpload.single('image'),
    [
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