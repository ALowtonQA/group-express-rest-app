const MONGOOSE = require("mongoose");
const SCHEMA = MONGOOSE.Schema;

const PRODUCT_SCHEMA = new SCHEMA({
    name: String,
    price: String
})

module.exports = MONGOOSE.model("Products", PRODUCT_SCHEMA);