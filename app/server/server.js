var path          = require('path')
var express       = require('express')
var url           = require('url')
var app           = express()
var routes        = require('./routes')
var passport      = require('passport')
var session       = require('express-session')
var RedisStore    = require('connect-redis')(session)

app.locals.viewUtils = require('./helpers/viewutils')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'client'))

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(session({
    store: new RedisStore({
        host: "127.0.0.1",
        port: "6379"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/js', express.static(path.join(__dirname, '..', 'client/js')))
app.use('/img', express.static(path.join(__dirname, '..', 'client/img')))
app.use('/css', express.static(path.join(__dirname, '..', 'client/css')))
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

routes(app)

app.listen(8080)
console.log("Listening on port 8080")
