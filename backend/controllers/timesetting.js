const timeModel = require("../models/timeModel")

class TimeSetting {

    async add(req, res, next) {

        try {
            await timeModel.create(req.body)
        } catch (err) {
            console.log(err.message)
        }
    }
    async update(req, res, next) {

        let data
        try {
            await timeModel.findByIdAndUpdate("63c230f8ff45ecf3b8ee0d8d", req.body)
            data = req.body
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

    async getAll(req, res, next) {

        let data
        try {

            data = await timeModel.findById("63c230f8ff45ecf3b8ee0d8d")
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

}

module.exports = new TimeSetting()