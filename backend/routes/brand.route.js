const express = require("express");
const router = express.Router();
const { addBrand, getBrands, updateBrand } = require("../handlers/brand-handler");

router.post("", async (req, res) => {
    let model = req.body;
    let result = await addBrand(model);
    res.send(result);
});

router.get("", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});

router.get("/:product_id", async (req, res) => {
    let id = req.params['product_id'];
    let result = await getBrandById(id);
    res.send(result);
});

router.put("/:product_id", async (req, res) => {
    let id = req.params['product_id'];
    let modal = req.body;
    let result = await updateBrand(id, modal);
    res.send(result);
});

module.exports = router;