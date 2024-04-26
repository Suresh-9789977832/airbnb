const express = require("express")
const { registeruser, loginuser, userprofile,uploadphoto } = require("../Controller/Usercontroller")
const multer = require("multer")
const userRouter = express.Router()


const photomiddleware=multer({dest:"uploads"})


userRouter.post('/register', registeruser)

userRouter.post('/login', loginuser)

userRouter.get('/profile/:token',userprofile)

userRouter.post('/upload',photomiddleware.array("photos",100), uploadphoto)




module.exports=userRouter