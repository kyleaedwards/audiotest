var passport         = require('passport')
var LocalStrategy    = require('passport-local').Strategy
var db               = require('../db')

module.exports = function (app) {

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            db.users.auth(email, password, function (err, user) {
                if (err) { return done(null, false); }
                if (!user) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        db.users.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });

    app.get('/login', function(req, res) {
        var errors = [
            'Invalid credentials. Please try again.',
            'That email address or handle already exists in our records.',
            'Your password does not match the confirmation field.',
            'Your password must contain at least one letter, one number and one special character.',
            'Your password must be at least 8 characters in length.',
            'Please use a valid email address.',
            'Something went wrong, please try again.',
            'User created successfully. Please log in to continue.',
            'You are now logged out.'
        ]
        if (req.user) {
            return res.redirect('/')
        }
        res.render('login', {
            bodyClass: 'login',
            styles: ['login'],
            error: req.query.e && errors[req.query.e] ? errors[req.query.e] : false
        })
    })

    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?e=0'
    }))

    app.get('/logout', function (req, res) {
        req.logout()
        res.redirect('/login?e=8')
    })

    app.post('/signup', function(req, res) {

        var handle = req.body.handle,
            password = req.body.password,
            email = req.body.email,
            confirm = req.body.password_confirm,
            user

        if (password != confirm) {
            res.redirect('/login?e=2')
        } else if (!email.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            res.redirect('/login?e=5')
        } else if (password.length < 8) {
            res.redirect('/login?e=4')
        } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%/^&*-]).{8,}$/.test(password)) {
            res.redirect('/login?e=3')
        } else {

            user = {
                handle: handle,
                password: password,
                email: email
            }

            db.users.create(user, function (err, rows) {
                if (err) {
                    res.redirect('/login?e=6')
                } else if (rows) {
                    res.redirect('/login?e=7')
                } else {
                    res.redirect('/login?e=6')
                }
            })

        }

    })

}
