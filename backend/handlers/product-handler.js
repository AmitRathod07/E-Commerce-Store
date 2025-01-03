const Product = require("../db/product");

async function addProduct(model){
    let product = new Product({ ...model });
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model) {
    const product = await Product.findByIdAndUpdate(id, model, { new: true });
    if (!product) {
        throw new Error(`Product with ID ${id} not found`);
    }
    return product.toObject();
}

async function deleteProduct(id){
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new Error(`Product with ID ${id} not found.`)
    }
    return product.toObject();
}

async function getAllProducts(){
    let products = await Product.find();
    return products.map(x => x.toObject());
}

async function getProduct(id){
    let product = await Product.findById(id);
    return product.toObject();
}

async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true
    });
    return newProducts.map(x => x.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({
        isFeatured: true
    });
    return featuredProducts.map(x => x.toObject());
}

module.exports = { addProduct, updateProduct, deleteProduct, getAllProducts, getProduct, getNewProducts, getFeaturedProducts }