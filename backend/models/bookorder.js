const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    district: String,
    mandal: String,
    npost: Number,
    ipost: Number,
    norder: Number,
    iorder: Number,
    date: String
}, { timeStamp: true })

const model = mongoose.model("bookorderdata", schema)
module.exports = model