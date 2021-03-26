const uuid=require('uuid')
const httpError=require("../Models/http-error")
const Users=require("../Models/users")
const {validationResult}=require("express-validator")

const getAllUsers=async (req,res,next)=>{
    let users
    try{
        users=await Users.find({},'-password');
    }
    catch(err){
        const error=new httpError("Could Not Find Users",500)
        return next(error)
    }
    if(!users){
        const error=new httpError("No Users Found",500)
        return next(error)
    }
    res.status(200).json({
        message:"Successfully Found User",
        users:users
    })
}

const signUp=async (req,res,next)=>{
    const {name,email,password}=req.body
    let hasUser;
    try{
        hasUser=await Users.findOne({email:email})
    }
    catch(err){
        const error=new httpError("SignUpk Failed,Something went Wrong",500)
        return next(error)
    }
    if (hasUser){
        const error=new httpError("User Already Exist",422)
        return next(error)
    }
    let result;
    try{
        const createdUser=await new Users({
            name,
            email,
            password,
            image:"https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg",
            places:[],
        })
        result=await createdUser.save();
    }
    catch(err){
        const error=new httpError("SignUp Failjjjed,Something went Wrong",500)
        return next(error)
    }
    res.status(200).json({
        message:"User Created Successfully",
        place:result
    })
}
const login=async (req,res,next)=>{
    const {email,password}=req.body
    const error=validationResult(req)
    if(!error){
        const error=new httpError("Input the Correct Fields",400)
        return next(error)
    }
    let existingUser;
    try{
        existingUser=await Users.findOne({email:email})
    }
    catch(err){
        const error=new httpError("Logging In Failed, Please Try Again Later",500)
        return next(error)
    }
    if(!existingUser){
        const error=new httpError("User Doesn't Exist")
        return next(error)
    }
    if(password!==existingUser.password){
        const error=new httpError("Invalid Password")
        return next(error)
    }
    res.status(200).json({
        message:"Loged In Successfully",
        data:existingUser
    })
}
exports.getAllUsers=getAllUsers
exports.signUp=signUp
exports.login=login