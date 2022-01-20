const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser());

mongoose.connect(process.env.MONGOO_URL, {useNewUrlParser: true}, function (error) {
    if (error) {
        console.log(error)
    } else {
        console.log("MongoDB connected!")
    }
})

app.use("/api/auth", require('./routes/auth'));
app.use("/api/users", require('./routes/users'));
app.use("/api/pins", require('./routes/pins'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, 'Route not found'));
});

const port = (process.env.APP_PORT || 8800)
app.listen(port, () => {
    console.log(`Backend server is running in port: ${port}`)
})