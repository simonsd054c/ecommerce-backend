const express = require("express")
const auth = require("../../middlewares/auth")

const {
    getCarts,
    getCartById,
    getCartByUserId,
    getCartByUserIdWithProductInfo,
} = require("./cartControllers")

const cartRouter = express.Router()

cartRouter.get("/", async (request, response) => {
    const carts = await getCarts()
    response.json(carts)
})

// /carts/cart?getProductInfo=false
cartRouter.get("/cart", auth, async (request, response) => {
    let cart
    if (request.query.getProductInfo) {
        cart = await getCartByUserIdWithProductInfo(request.payload.id)
    } else {
        cart = await getCartByUserId(request.payload.id)
    }
    response.json(cart)
 })

 //carts/id
cartRouter.get("/:cartId", async (request, response) => {
    const cart = await getCartById(request.params.cartId)
    if (!cart) {
        response.status(404).json({
            data: "cart doesn't exist",
        })
    }
    response.json(cart)
})

// /carts/user/userId?getProductInfo=true
cartRouter.get("/user/:userId", async (request, response) => {
    let cart
    if (request.query.getProductInfo) {
        cart = await getCartByUserIdWithProductInfo(request.params.userId)
    } else {
        cart = await getCartByUserId(request.params.userId)
    }
    if (!cart) {
        response.status(404).json({
            data: "cart doesn't exist",
        })
    }
    response.json(cart)
})

module.exports = cartRouter
