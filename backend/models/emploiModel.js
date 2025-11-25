const mongoose = require("mongoose");

const emploiSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  emploiImage: { type: String, required: true },
});

module.exports = mongoose.model("Emploi", emploiSchema);
