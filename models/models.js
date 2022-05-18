const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    url: { type: String, required: true },
    views: { type: Number, default: 0 },
});

module.exports = mongoose.model("linkModel", linkSchema);
