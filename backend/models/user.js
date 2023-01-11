const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    mandal: String,
    role: {
        type: String,
        default: "user"
    },
    password: String
})

const model = mongoose.model("userdata", schema)
module.exports = model