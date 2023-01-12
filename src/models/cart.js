const mongoose = require("mongoose")

const CartProductSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        quantity: Number,
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
)

const CartSchema = new mongoose.Schema({
    user_id: String,
    products: [CartProductSchema],
})

CartProductSchema.virtual("product", {
    localField: "product_id",
    foreignField: "_id",
    ref: "Product",
    justOne: true,
})

const Cart = mongoose.model("Cart", CartSchema)

module.exports = Cart
