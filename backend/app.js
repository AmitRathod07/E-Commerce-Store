const express = require("express");
const { default: mongoose, connect } = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category.route");
const brandRoutes = require("./routes/brand.route");
const productRoutes = require("./routes/product.route");
const custmerRoutes = require("./routes/customer.route");
const authRoutes = require("./routes/auth.route");
const { verifyToken, isAdmin } = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Server running")
});
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, custmerRoutes);
app.use("/auth", authRoutes)

async function connectDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp",{
        dbName: "E-Comm-Store-DB",
    });
    console.log("mongodb connected");
}

connectDB().catch((err) => {
    console.error(err);
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})