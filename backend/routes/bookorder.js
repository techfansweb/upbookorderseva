const bookorder = require("../controllers/bookorder")
const router = require("express").Router()

router.route("/").post(bookorder.add)
router.route("/").get(bookorder.getAll)
router.route("/delete").post(bookorder.deleteBook)

module.exports = router