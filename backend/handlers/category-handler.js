const Category = require("../db/category");

async function addCategory(model){
    let categories = await getCategories();
    const existingCategpry = await brands.find(category => category.name.toLowerCase() === model.name.toLowerCase());
    
    if (existingCategpry) {
        throw new Error('Categpry with name "' + model.name + '" already exists.');
    }
    let category = new Category({
        name: model.name
    });
    await category.save();
    return category.toObject();
}

async function getCategories(){
    let categories = await Category.find();
    return categories.map(category => category.toObject());
}

async function getCategoryById(id){
    let category = await Category.findById(id);
    return category.toObject();
}

async function updateCategory(id, model){
    await Category.findOneAndUpdate({ _id: id }, model);
    return;
}

async function deleteCategory(id) {
    await Category.findOneAndDelete(id);
    return;
}

module.exports = { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById }