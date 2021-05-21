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
        res.send(PRODUCTS);
    } catch(err) {
        console.log(err.stack);
        res.status(500).send(err.message);
    }
});

// Get by ID - Dinesh
ROUTER.get("/get/:id", async(req, res) => {
    try {
        const FOUND = await PRODUCT.findById(req.params.id);
        res.send(FOUND);
    } catch(err) {
        console.log(err.message);
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
        res.status(202).send(UPDATED);
    } catch(err) {
        console.log(err.stack);
        res.status(404).send(err.message);
    }
});

// Delete Request - Usman
ROUTER.delete("/delete/:id", async(req, res) => {
    try {
        await PRODUCT.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch(err) {
        console.log(err.stack);
        res.status(404).send(err.message);
    }
});

// Export
module.exports = ROUTER;
