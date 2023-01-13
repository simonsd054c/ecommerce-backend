const express = require("express")

const {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
} = require("./productControllers")

const auth = require("../../middlewares/auth")

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

productRouter.post("/", auth, async (request, response) => {
    console.log(request.userId)
    const product = await createProduct({
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        stock: request.body.stock,
    })
    response.json(product)
})

productRouter.delete("/:productId", async (request, response) => {
    const product = await deleteProduct(request.params.productId)
    response.json(product)
})

module.exports = productRouter
