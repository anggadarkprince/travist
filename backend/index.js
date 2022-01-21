const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const errorhandler = require('errorhandler')
const morgan = require('morgan')
const winston = require('winston')
const fs = require('fs')
const path = require('path')
const helmet = require("helmet");

dotenv.config()
app.use(helmet());
app.use(express.json())
app.use(cors({
    origin: [process.env.APP_URL, process.env.APP_FRONTEND_URL],
    optionsSuccessStatus: 200,
    credentials: true
}))
app.use(cookieParser())

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }
}))
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'})
}))

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
    app.use(errorhandler());
}

const loggerWinston = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({filename: 'logs/all.log'}),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    loggerWinston.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

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