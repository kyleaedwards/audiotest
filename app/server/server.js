var path          = require('path')
var express       = require('express')
var url           = require('url')
var app           = express()
var routes        = require('./routes')
var passport      = require('passport')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '..', 'client'))

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/js', express.static(path.join(__dirname, '..', 'client/js')))
app.use('/img', express.static(path.join(__dirname, '..', 'client/img')))
app.use('/css', express.static(path.join(__dirname, '..', 'client/css')))
app.use('/examples', express.static(path.join(__dirname, '..', 'client/examples')))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

routes(app)

app.listen(8080)
console.log("Listening on port 8080")
