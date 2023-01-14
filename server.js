const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

// uses
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://127.0.0.1:5173", "/"]
}))

// disploay files
app.use(express.static(path.resolve(__dirname, "frontend", "dist")))

// database
const database = require("./backend/database/database")

// routes
const user = require("./backend/routes/user")
const bookorder = require("./backend/routes/bookorder")
const timesetting = require("./backend/routes/timesetting")

app.use("/api/bookseva/user", user)
app.use("/api/bookseva/bookorder", bookorder)
app.use("/api/bookseva/timesetting", timesetting)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})

app.use((err, req, res, next) => {

    res.send(err.message)
})


app.listen(port, err => {
    if (err) {
        console.log(err.message)
    }

    console.log(`server runnig at port ${port}`)
})
