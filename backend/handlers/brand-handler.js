const Brand = require("./../db/brand");

async function getBrands(){
    let brands = await Brand.find();
    return brands.map(x=>x.toObject());
}

async function getBrand(id){
    let brand = await Brand.findById(id);
    return brands.map(x=>x.toObject());
}

async function addBrand(model){
    let brand = new Brand({
        name: model.name
    });
    await brands.save();
    return brand.toObject();
}

async function updateBrand(id, model){
    await Brand.findByIdAndUpdate(id, model);
}

async function deleteBrand(id){
    await Brand.findByIdAndRemove(id);
}

module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand }