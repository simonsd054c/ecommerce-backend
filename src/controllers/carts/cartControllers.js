const Cart = require("../../models/cart")

const carts = [
    {
        user_id: 1,
        products: [
            {
                product_id: 1,
                quantity: 2,
            },
            {
                product_id: 2,
                quantity: 5,
            },
        ],
    },
    {
        user_id: 2,
        products: [
            {
                product_id: 0,
                quantity: 4,
            },
            {
                product_id: 3,
                quantity: 12,
            },
        ],
    },
]

async function getCarts() {
    //get all the carts from the database
    const carts = await Cart.find()
    return carts
}

async function getCartById(cartId) {
    //get the cart from the database with id 'cartId'
    const cart = await Cart.findById(cartId)
    return cart
}

async function getCartByUserId(userId) {
    //get the cart from the database with user id 'userId'
    const cartByUserId = await Cart.findOne({ user_id: userId })
    return cartByUserId
}

async function getCartByUserIdWithProductInfo(userId) {
    const cartByUserIdWithProductInfo = await Cart.findOne({
        user_id: userId,
    }).populate({path: "products.product"})
    return cartByUserIdWithProductInfo
}

module.exports = {
    getCarts,
    getCartById,
    getCartByUserId,
    getCartByUserIdWithProductInfo,
}
