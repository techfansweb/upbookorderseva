const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    reportClose: String,
    formOpen: String,
    formClose: String,
}, { timeStamp: true })

const model = mongoose.model("timesetting", schema)
module.exports = model