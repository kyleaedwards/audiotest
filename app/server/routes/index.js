var authRoutes = require('./auth')
var db         = require('../db')
var ensureLogin = require('connect-ensure-login').ensureLoggedIn()

module.exports = function (app) {

    authRoutes(app)

    app.get('/', ensureLogin, function(req, res) {
        res.render('index')
    })

}
