const user = require("../controllers/user")
const router = require("express").Router()

router.route("/").post(user.add)
router.route("/").get(user.getAll)
router.route("/delete").post(user.deleteUser)
router.route("/single").post(user.getSingle)

module.exports = router