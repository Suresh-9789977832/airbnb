const { hashedpassword, comparepassword, createtoken } = require("../Common/Common")
const Usermodal = require("../Modal/Usermodal")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const extpath=require("path")

const registeruser = async (req, res) => {
    try {
        
        let name = req.body.name
        let email=req.body.email
        let password=req.body.password
        
    
        if (name && email && password) {
            password = await hashedpassword(password)
            const data = await Usermodal.findOne({email})

            if (!data) {
                const result = await Usermodal.create({ name, email, password })
                res.status(201).send({  
                    message: "user created",
                })
            }
            else {
                res.status(400).send({
                    message:`${email} already exists`
                })
            }

        }
        else {
            res.status(400).send({
                message: "Please fill all the field"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
    
}

const loginuser = async(req,res) => {
    try {

        let email = req.body.email
        let password=req.body.password

        if (email && password) {
            const data = await Usermodal.findOne({ email })

            if (data) {
                if (await comparepassword(password, data.password)) {
                    const token = await createtoken({ name: data.name, email: data.email, id: data._id })
                    const {password, ...restdata}=data._doc
                    res.status(200).send({
                        message: "login successfull",
                        restdata,
                        token
                        })
                }
                else {
                    res.status(400).send({
                        message:"Invalid password"
                    })
                }
            }
            else {
                res.status(400).send({
                    message:"Enter your register email id"
                })
            }


        }
        else {
            res.status(400).send({
                message: "Please fill all the field"
            })
        }
        
        
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const userprofile = async (req, res) => {
    const token = req.params.token
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                res.status(401).send({
                   message:"please login your account"
               })
            }
            else {
                res.json(data)
            }
    })
    }
    else {
        res.json(null)
    }
}
   
const uploadphoto = async (req, res) => {
    const uploadedfiles=[]
    for (let i = 0; i < req.files.length; i++){
        const { path,originalname } = req.files[i]
        const ext=extpath.extname(originalname)
        const newpath = path + ext
        console.log(newpath)
        fs.renameSync(path, newpath)
        uploadedfiles.push(newpath.replace('upload/', ""))
    }
    res.json(uploadedfiles)
}



module.exports = {
    registeruser,
    loginuser,
    userprofile,
    uploadphoto
}