"use strict";

const ROUTER = require("express").Router();
const PRODUCT = require("./models/product");

// Post Requests
ROUTER.post("/create", async(req, res) => {
    const NEW_OBJ = {
        name: req.body.name,
        price: req.body.price
    };
    const DOC = new PRODUCT (NEW_OBJ); // New document using model
    try {
        await DOC.save();
        res.status(201).send(NEW_OBJ)
    } catch(err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }
});

// Get All (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res) => {
    try {
        const PRODUCTS = await PRODUCT.find();
        if (PRODUCTS.length) res.send(PRODUCTS);
        res.status(500).send("No products to retrieve");
    } catch(err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }
});

// Get by ID - Dinesh
ROUTER.get("/get/:id", async(req, res) => {
    try {
        const FOUND = await PRODUCT.findById(req.params.id);
        if (FOUND) res.send(FOUND);
        res.status(404).send("Cannot find a product with that ID!");
    } catch(err) {
        console.log(err.message);
        res.status(404).send("Cannot find a product with that ID!");
    }
});

// Put Request - Ryan Glennerster
ROUTER.put("/update/:id", async(req, res) => {
    try{
        const UPDATED = await PRODUCT.findByIdAndUpdate(
            {_id: req.params.id}, 
            {name: req.query.name},
            {new: true}
        );
        if (UPDATED) res.status(202).send(UPDATED);
        res.status(404).send("Cannot find a product with that ID!");
    } catch(err) {
        console.log(err.stack);
        res.status(404).send("Cannot find a product with that ID!");
    }
});

// Delete Request - Usman
ROUTER.delete("/delete/:id", async(req, res) => {
    try {
        const DELETED = await PRODUCT.findByIdAndDelete(req.params.id);
        if (DELETED) res.status(204).send();
        res.status(404).send("Cannot find a product with that ID!");
    } catch(err) {
        console.log(err.stack);
        res.status(404).send("Cannot find a product with that ID!");
    }
});

// Export
module.exports = ROUTER;
