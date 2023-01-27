const express = require("express")

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("./productControllers")

const auth = require("../../middlewares/auth")
const admin = require("../../middlewares/admin")

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

productRouter.put("/:productId", async (request, response) => {
    const updatedProduct = await updateProduct(request.params.productId, {
        title: request.body.title,
        description: request.body.description,
        price: request.body.price,
        stock: request.body.stock,
    })
    response.json(updatedProduct)
})

productRouter.delete("/:productId", auth, admin, async (request, response) => {
    const product = await deleteProduct(request.params.productId)
    response.json(product)
})

module.exports = productRouter
