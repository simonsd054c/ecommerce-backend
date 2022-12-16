const express = require("express")
const productRouter = require("./controllers/products/productRoutes")
const cartRouter = require("./controllers/carts/cartRoutes")

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

app.listen(PORT, () => {
    console.log("Server Started")
})
