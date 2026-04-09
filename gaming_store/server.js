const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// API to handle product addition
app.post("/add-product", async (req, res) => {
    try {
        const response = await axios.post("http://localhost/gaming_shop/add_product.php", req.body);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
});

// API to fetch recent products
app.get("/get-products", async (req, res) => {
    try {
        const response = await axios.get("http://localhost/gaming_shop/get_products.php");
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
