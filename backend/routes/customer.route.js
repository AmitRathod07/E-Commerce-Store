const express = require("express");
const { getNewProducts, getFeaturedProducts } = require("../handlers/product-handler");
const router = express.Router();

router.get("/new-products", async (req, res) => {
    console.log("Received request for new products");
    try {
        const products = await getNewProducts();
        res.send(products);
    } catch (err) {
        console.error("Error fetching new products:", err);
        res.status(500).send({ error: "Failed to fetch new products" });
    }
});

router.get("/featured-products", async (req, res) => {
    console.log("Received request for featured products");
    try {
        const products = await getFeaturedProducts();
        res.send(products);
    } catch (err) {
        console.error("Error fetching featured products:", err);
        res.status(500).send({ error: "Failed to fetch featured products" });
    }
});

module.exports = router;