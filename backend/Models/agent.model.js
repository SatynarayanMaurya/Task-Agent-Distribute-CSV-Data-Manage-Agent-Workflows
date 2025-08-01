const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  countryCode:String,
  phone: String,
  password: String, // (hash it if you want)
});

module.exports = mongoose.model("Agent", agentSchema);
