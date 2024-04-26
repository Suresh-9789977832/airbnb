const bcryptjs = require("bcryptjs")
const saltround = 10
const jwt=require("jsonwebtoken")

const hashedpassword = async (password) => {
    let salt=await bcryptjs.genSalt(saltround)
    let hashpassword = await bcryptjs.hash(password,salt)
    return hashpassword
}

const comparepassword = async (password, hashedpassword) => {
    let compare = await bcryptjs.compare(password, hashedpassword)
    return compare
}

const createtoken = async (value) => {
    const token = await jwt.sign(value, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
    return token
}

module.exports = {
    hashedpassword,
    comparepassword,
    createtoken
}