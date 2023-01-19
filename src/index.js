const mongoose = require("mongoose")
const { app, PORT } = require("./server")

app.listen(PORT, () => {
    console.log("Server Started")
    mongoose.set("strictQuery", false)
    mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", () => {
        console.log("Database connnected")
    })
})
