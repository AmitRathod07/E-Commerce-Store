const Brand = require("./../db/brand");

async function getBrands(){
    let brands = await Brand.find();
    return brands.map(x=>x.toObject());
}

async function getBrand(id){
    let brand = await Brand.findById(id);
    return brand.toObject();
}

async function addBrand(model){
    let brands = await getBrands();
    const existingBrand = await brands.find(brand => brand.name.toLowerCase() === model.name.toLowerCase());
    
    if (existingBrand) {
        throw new Error('Brand with name "' + model.name + '" already exists.');
    }
    let brand = new Brand({
        name: model.name
    });
    await brand.save();
    return brand.toObject();
}

async function updateBrand(id, model){
    await Brand.findByIdAndUpdate(id, model);
    return;
}

async function deleteBrand(id){
    await Brand.findByIdAndRemove(id);
    return;
}

module.exports = { getBrands, getBrand, addBrand, updateBrand, deleteBrand }