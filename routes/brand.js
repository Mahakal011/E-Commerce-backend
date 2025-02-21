var express = require("express");
var router = express.Router();
const {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brand");


router.post("/brand", async function (req, res) {
  try {
    await createBrand(req.body);
    res.status(201).send("Brand created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get("/brand", async (req, res) => {
  try {
    const brands = await getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res,
      satus(500).json({
        message: "Error fetching brands",
        error: error.message,
      });
  }
});

router.get("/brand/:id", async function (req, res) {
  const brand = await getBrand(req.params.id);
  res.status(200).json(brand);
});

router.put("/brand/:id", async function (req, res) {
  const brand = await updateBrand(req.params.id, req.body);
  res.status(200).send("Category updated successfully.");
});

router.delete("/brand/:id", async function (req, res) {
  try {
    const result = await deleteBrand(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("not found")) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
