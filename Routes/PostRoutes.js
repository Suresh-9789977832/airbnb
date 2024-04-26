const express = require("express")
const { postplaces, user_getllplaces, getplacesbyid,editplaces, getallplaces } = require("../Controller/Postcontroller")
const postrouter = express.Router()


postrouter.post('/places/:token', postplaces)

postrouter.get('/user_places/:token', user_getllplaces)

postrouter.get('/getplacebyid/:id', getplacesbyid)

postrouter.put('/editplaces/:token',editplaces)

postrouter.get('/getallplaces',getallplaces)


module.exports=postrouter