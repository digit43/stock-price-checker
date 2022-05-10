const mongoose = require('mongoose');
const {Schema} = mongoose;

const GoodSchema = new Schema({
  name: String,
  price: Number,
  likes: [{type: Schema.Types.ObjectId, ref: "ip"}]
});

const goodModel = mongoose.model("Good", GoodSchema);

module.exports = goodModel;