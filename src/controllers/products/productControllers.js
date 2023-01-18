const Product = require("../../models/product")

async function getProducts() {
    //get the products from the database
    const products = await Product.find()
    return products
}

async function getProductById(productId) {
    //get the product from the database with id 'productId'
    try {
        const product = await Product.findById(productId)
        return product
    } catch(err) {
        //we can also return customized error message
        console.log(err)
    }
}

async function createProduct(product) {
    //insert the product into the database and return that created product
    const newProduct = await Product.create(product)
    return newProduct
}

async function deleteProduct(productId) {
    //deteleOne and deleteMany will delete but not return the records
    //findByIdAndDelete and findOneAndDelete will detele and return the deleted record
    const deletedProduct = await Product.findByIdAndDelete(productId)
    return deletedProduct
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
}
