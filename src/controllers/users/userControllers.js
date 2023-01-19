const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Admin = require("../../models/admin")
const User = require("../../models/user")
const { createCart } = require("../carts/cartControllers")

async function registerUser(user) {
    const existingUser = await User.findOne({ username: user.username })
    if (existingUser) {
        return { error: "Username already exists" }
    }
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const userCreated = await User.create({
        name: user.name,
        username: user.username,
        password: hashedPassword,
    })
    const payload = {
        id: userCreated._id,
    }
    const token = jwt.sign(payload, "secret")
    await createCart({
        user_id: userCreated._id,
        products: [],
    })
    return token
}

async function loginUser(user) {
    //check if username exists
    const existingUser = await User.findOne({ username: user.username })
    if(!existingUser) {
        return { error: "username or password is incorrect" }
    }
    //match the password
    const isMatch = await bcrypt.compare(user.password, existingUser.password)
    if(!isMatch) {
        return { error: "username or password is incorrect" }
    }
    //create the token
    const payload = {
        id: existingUser._id,
        // is_admin: undefined which translates to false
    }
    const token = jwt.sign(payload, "secret")
    //return the token
    return token
}

async function loginAdmin(user) {
    //check if username exists
    const existingUser = await Admin.findOne({ username: user.username })
    if(!existingUser) {
        return { error: "username or password is incorrect" }
    }
    //match the password
    const isMatch = await bcrypt.compare(user.password, existingUser.password)
    if(!isMatch) {
        return { error: "username or password is incorrect" }
    }
    //create the token
    const payload = {
        id: existingUser._id,
        is_admin: true,
    }
    const token = jwt.sign(payload, "secret")
    //return the token
    return token
}

module.exports = {
    registerUser,
    loginUser,
    loginAdmin,
}
