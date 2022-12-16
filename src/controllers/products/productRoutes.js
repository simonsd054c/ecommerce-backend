const express = require("express")

const {
    getProducts,
    getProductById,
    createProduct,
} = require("./productControllers")

const productRouter = express.Router()

productRouter.get("/", (request, response) => {
    const products = getProducts()
    response.json(products)
})

productRouter.get("/:productId", (request, response) => {
    const product = getProductById(request.params.productId)
    if (!product) {
        response.status(404).json({
            data: "Product doesn't exist",
        })
    }
    response.json(product)
})

productRouter.post("/", (request, response) => {
    const product = createProduct({
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        stock: request.body.stock,
    })
    response.json(product)
})

module.exports = productRouter
