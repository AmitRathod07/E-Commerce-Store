const express = require("express");
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../handlers/category-handler");

router.post("",async (req, res) => {
    try {
        let model = req.body;
        let result = await addCategory(model);
        res.send(result);
    } catch (error) {
        res.status(400);
    }
});

router.get("", async (req, res) => {
    let result = await getCategories();
    res.send(result);
});

router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let result = await getCategoryById(id);
    res.send(result);
});

router.put("/:id",async (req, res) => {
    let model = req.body;
    let id = req.params['id'];
    let result = await updateCategory(id, model);
    res.send(result);
});

router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    let result = await deleteCategory(id);
    res.send(result);
})

module.exports = router;