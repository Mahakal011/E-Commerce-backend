var express = require("express");
var router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product");

router.post("/products", async function (req, res) {
  try {
    var products = req.body;
    products.forEach(async (product) => {
      await createProduct(product);
    });
    res.status(201).send("Product created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/product", async function (req, res) {
  try {
    await createProduct(req.body);
    res.status(201).send("Product created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/product", async (req, res) => {
  try {
    const { search, categoryId, minRange, maxRange, brandIds } = req.query;
    const products = await getAllProducts(
      search,
      categoryId,
      brandIds && brandIds !== '' ? brandIds.split(';').map(b => parseInt(b)) : [],
      parseInt(minRange ?? 0),
      parseInt(maxRange ?? 80000)
    );
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
});

router.put("/product/:id", async function (req, res) {
  if (!req.params.id) {
    return res.status(400).send("Product ID is required");
  }
  
  try {
    await updateProduct(req.params.id, req.body);
    res.status(200).send("Product updated successfully.");
  } catch (error) {
    res.status(500).send("Error updating product");
  }
});

router.get("/product/:id", async function (req, res) {
  const product = await getProduct(req.params.id);
  res.status(200).json(product);
});

router.delete("/product/:id", async function (req, res) {
  try {
    const result = await deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
