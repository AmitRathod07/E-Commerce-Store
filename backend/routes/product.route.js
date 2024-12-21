const express = require("express");
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../handlers/product-handler");
const router = express.Router();

router.post("/", async (req, res) => {
    let model = req.body;
    let product = await addProduct(model);
    res.send(product);
});

router.get("/", async (req, res) => {
    let result = await getAllProducts();
    res.send(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let result = await getProduct(id);
    res.send(result);
});

router.put("/:id",async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    let result = await updateProduct(id, model);
    res.send(result);
});

router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    let result = await deleteProduct(id);
    res.send(result);
});

module.exports = router;