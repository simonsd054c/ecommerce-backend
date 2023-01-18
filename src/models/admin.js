const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
})

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin