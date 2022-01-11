const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require('cors')

const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

dotenv.config()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGOO_URL, {useNewUrlParser: true}, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("MongoDB connected!")
    }
})

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute)

app.listen(8800, () => {
    console.log("Backend server is running!")
})