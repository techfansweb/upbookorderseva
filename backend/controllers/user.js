const userModel = require("../models/user")

class User {

    async add(req, res, next) {

        try {
            await userModel.create(req.body)
        } catch (err) {
            console.log(err.message)
        }

        res.status(201).send({ success: true })
    }

    async getAll(req, res, next) {

        let data
        try {

            data = await userModel.find() || []
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

    async getSingle(req, res, next) {

        let data
        try {

            data = await userModel.findById(req.body.id) || {}
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

    async deleteUser(req, res, next) {

        try {
            await userModel.findByIdAndDelete(req.body.id)
        } catch (err) {
            console.log(err.message)
        }

        res.status(200).send({ success: true })
    }
}

module.exports = new User()