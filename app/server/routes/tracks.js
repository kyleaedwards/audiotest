var db          = require('../db')
var ensureLogin = require('connect-ensure-login').ensureLoggedIn()

module.exports = function (app) {

    app.get('/track/:slug', ensureLogin, function(req, res) {

        var track_slug = req.params.slug
        if (!track_slug) {
            res.redirect('/404')
        }

        db.tracks.getBySlug(track_slug, req.user.id, function (err, tracks) {
            if (tracks && tracks[0]) {
                res.render('track', {
                    track: tracks[0],
                    user: req.user
                })
            } else {
                res.redirect('/404')
            }
        })

    })

}
