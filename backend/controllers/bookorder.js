const bookModel = require("../models/bookorder")

class BookOrder {

    async add(req, res, next) {

        try {
            await bookModel.create(req.body)
        } catch (err) {
            console.log(err.message)
        }

        res.status(201).send({ success: true })
    }

    async getAll(req, res, next) {

        let data
        try {

            data = await bookModel.find() || []
        } catch (err) {
            console.log(err.message)
        }

        res.send(data)
    }

    async deleteBook(req, res, next) {

        try {
            await bookModel.findByIdAndDelete(req.body.id)
        } catch (err) {
            return next(err)
        }

        res.status(200).send({ success: true })
    }
}

module.exports = new BookOrder()