const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplier");

router.get("/", async (req, res) => {
  try {
    const suppliers = await Supplier.getAll();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const supplier = await Supplier.getById(req.params.id);
    if (!supplier) res.status(404).send("Supplier not found");
    else res.json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Supplier.create(req.body);
    res.status(201).json({ supplierId: result.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await Supplier.update(req.params.id, req.body);
    res.send("Supplier updated successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Supplier.delete(req.params.id);
    res.send("Supplier deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
