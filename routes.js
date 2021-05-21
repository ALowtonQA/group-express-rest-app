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
        console.log(err.message);
    }
});

// Get Requests (200 is default HTTP status code)
ROUTER.get("/getAll", async(req, res) => {
    try {
        const PRODUCTS = await PRODUCT.find();
        res.send(PRODUCTS);
    } catch(err) {
        console.log(err.message);
    }
});

// Export
module.exports = ROUTER;
