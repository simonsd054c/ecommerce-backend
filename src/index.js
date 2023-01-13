const express = require("express")
const mongoose = require("mongoose")

const productRouter = require("./controllers/products/productRoutes")
const cartRouter = require("./controllers/carts/cartRoutes")
const userRouter = require("./controllers/users/userRoutes")

const app = express()

app.use(express.json());

const PORT = 5000

app.get("/", (request, response) => {
    response.json({
        data: "Data Sent",
    })
})

app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log("Server Started")
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", () => {
        console.log("Database connnected")
    })
})
