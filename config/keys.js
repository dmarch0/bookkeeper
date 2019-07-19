const keys_prod = require("./keys_prod");
const keys_dev = require("./keys_dev");

module.exports = process.env.NODE_ENV === "propd" ? keys_prod : keys_dev;
