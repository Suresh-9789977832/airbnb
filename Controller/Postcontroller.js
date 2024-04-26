const Placemodal = require("../Modal/Postmodal")
const jwt = require("jsonwebtoken")


const postplaces = async (req, res) => {
    try {
        const token = req.params.token;
        const { title, address,
            addedphotos, description,
            extrainfo, checkin, checkout,
            maxguests,perks,price } = req.body
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            const places=await Placemodal.create({
            owner: data.id,title, address,
            addedphotos, description,price,
            extrainfo, checkin, checkout,maxguests,perks
            })
                res.json(places)
    
            })
        }
    
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
    

}

const user_getllplaces = async (req, res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if(!err){
                const { id } = data
                res.json( await Placemodal.find({owner:id}))
            } 

        }) 
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
  

}

const getplacesbyid =async (req,res) => {
    try {
        let id = req.params.id
            res.json(await Placemodal.findById(id))
            } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

const editplaces = (req,res) => {
    try {
        const token = req.params.token;
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (!err) {
                const {id, title, address,
                    addedphotos, description,
                    extrainfo, checkin, checkout,
                    maxguests, perks,price } = req.body
                const placedoc = await Placemodal.findById(id)
                if (data.id === placedoc.owner.toString())
                    placedoc.set({
                        title, address,
                    addedphotos, description,
                    extrainfo, checkin, checkout,
                    maxguests, perks,price
                    })
                await placedoc.save()
                res.json("ok")
            }
        }) 
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
    
}


const getallplaces = async(req,res) => {
    try {
        res.json(await Placemodal.find())
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            errormessage:error.message
        })
    }
}

module.exports = {
    postplaces,
    user_getllplaces,
    getplacesbyid,
    editplaces,
    getallplaces
}