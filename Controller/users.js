const uuid=require('uuid')
const httpError=require("../Models/http-error")
const {validationResult}=require("express-validator")
let DUMMY_USERS=[
    {
        name:"Huzaifa",
        email:"huzaifa.ahmed181@gmail.com",
        password:'123'
    },
]

const getAllUsers=(req,res,next)=>{
    if(DUMMY_USERS.length==0){
        const error=new httpError("Could Find Place",401)
        return next(error)
    }
    res.status(200).json({
        place:DUMMY_USERS
    })
}

const signUp=(req,res,next)=>{
    const {name,email,password}=req.body
    const hasUserAlready=DUMMY_USERS.find(e=>e.email==email)
    const error=validationResult(req)
    if(!error){
        const error=new httpError("Input the Correct Fields",400)
        return next(error)
    }
    if(hasUserAlready){
        const error=new httpError("User Already Exist",201)
        return next(error)
    }
    const NEW_USER={
        id:uuid,
        name,
        email,
        password
    }
    DUMMY_USERS.push(NEW_USER)
    res.status(200).json({
        message:"User create successfully",
        place:NEW_USER
    })
}
const login=(req,res,next)=>{
    const {email,password}=req.body
    const identifiedUser=DUMMY_USERS.find(e=>e.email==email)
    const error=validationResult(req)
    if(!error){
        const error=new httpError("Input the Correct Fields",400)
        return next(error)
    }
    if(!identifiedUser){
        const error=new httpError("User Doesn't Exist")
        return next(error)
    }
    if(identifiedUser.password!=password){
        const error=new httpError("Invalid Password")
        return next(error)
    }
    res.status(200).json({
        message:"Loged In Successfully",
    })
}
exports.getAllUsers=getAllUsers
exports.signUp=signUp
exports.login=login