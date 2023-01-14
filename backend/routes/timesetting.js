const timesetting = require("../controllers/timesetting")
const router = require("express").Router()

router.route("/").post(timesetting.add)
router.route("/").get(timesetting.getAll)
router.route("/update").post(timesetting.update)

module.exports = router