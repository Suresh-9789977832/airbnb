const dotenv=require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors=require("cors")
const userRouter = require("./Routes/UserRoutes")
const postrouter = require("./Routes/PostRoutes")
const PORT = process.env.PORT


app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173/",
}))
app.use('/user', userRouter)
app.use('/post',postrouter)


// app.get('/register', (req, res) => {
//     res.send({
//         message:"welcome to new project"
//     })
// })



      



app.listen(PORT,()=>console.log(`app is running successfull ${PORT}`))
