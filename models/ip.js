const mongoose = require('mongoose');
const {Schema} = mongoose;

const ipSchema = new Schema({
  ip: String,
  stock: String,
});

const ipModel = mongoose.model("ip", ipSchema);

module.exports = ipModel;