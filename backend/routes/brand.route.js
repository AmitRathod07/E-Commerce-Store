const express = require("express");
const router = express.Router();
const { addBrand, getBrands, updateBrand, getBrand } = require("../handlers/brand-handler");

router.post("", async (req, res) => {
    try {
        let model = req.body;
        let result = await addBrand(model);
        res.send(result);
    } catch (error) {
        // console.error('Error adding brand:', error.message);
        res.status(400);
    }
});

router.get("", async (req, res) => {
    let result = await getBrands();
    res.send(result);
});

router.get("/:product_id", async (req, res) => {
    let id = req.params['product_id'];
    let result = await getBrand(id);
    res.send(result);
});

router.put("/:product_id", async (req, res) => {
    let id = req.params['product_id'];
    let modal = req.body;
    let result = await updateBrand(id, modal);
    res.send(result);
});

module.exports = router;