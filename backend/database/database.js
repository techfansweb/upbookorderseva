const mongoose = require("mongoose")

mongoose
    .set({ strictQuery: false })
    .connect(process.env.MONGO_URI)
    .then(() => console.log("database connected"))
    .catch(() => console.log("database not connected"))