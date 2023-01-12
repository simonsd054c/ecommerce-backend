const express = require("express")

const {
    getProducts,
    getProductById,
    createProduct,
} = require("./productControllers")

const productRouter = express.Router()

productRouter.get("/", async (request, response) => {
    const products = await getProducts()
    response.json(products)
})

productRouter.get("/:productId", async (request, response) => {
    const product = await getProductById(request.params.productId)
    if (!product) {
        response.status(404).json({
            data: "Product doesn't exist",
        })
    }
    response.json(product)
})

productRouter.post("/", async (request, response) => {
    const product = await createProduct({
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        stock: request.body.stock,
    })
    response.json(product)
})

module.exports = productRouter
