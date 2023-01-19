const express = require("express")
const cors = require("cors")

const productRouter = require("./controllers/products/productRoutes")
const cartRouter = require("./controllers/carts/cartRoutes")
const userRouter = require("./controllers/users/userRoutes")

const app = express()

app.use(express.json());

const corsOption = {
    origin: ["http://localhost:3000"], // the origin that we want to accept, i.e. our frontend
    optionsSuccessStatus: 200
}

app.use(cors(corsOption))

const PORT = 5000

app.get("/", (request, response) => {
    response.json({
        data: "Data Sent",
    })
})

app.use("/products", productRouter)
app.use("/carts", cartRouter)
app.use("/auth", userRouter)

module.exports = {
    app,
    PORT
}