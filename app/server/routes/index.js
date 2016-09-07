var authRoutes  = require('./auth')
var trackRoutes = require('./tracks')
var db          = require('../db')
var ensureLogin = require('connect-ensure-login').ensureLoggedIn()
var formidable  = require('formidable')
var path        = require('path')

module.exports = function (app) {

    authRoutes(app)
    trackRoutes(app)

    app.post('/upload', ensureLogin, function(req, res) {
        var form = new formidable.IncomingForm();
        form.uploadDir = path.join(__dirname, '../..', 'uploads');
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {

            var track = {
                user_id: parseInt(fields.user_id, 10),
            },
            upload = files.upload

            if (upload) {
                track.filesize = upload.size
                track.path = upload.path
                track.type = upload.type
                track.title = upload.name

                db.tracks.create(track, function (err, rows) {
                    if (err) {
                        res.json({
                            success: false,
                            message: 'Upload failed.',
                            err: err
                        })
                    } else {
                        res.json({
                            success: true,
                            track: track
                        })
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'Upload failed.'
                })
            }

        });
    })

    app.get('/', ensureLogin, function(req, res) {
        if (req.user && req.user.id) {
            db.tracks.getByUser(req.user.id, function (err, tracks) {
                if (err) {
                    console.log(err)
                    tracks = []
                }
                res.render('tracklist', {
                    user: req.user,
                    tracks: tracks
                })
            })
        } else {
            res.render('tracklist', {
                user: req.user,
                tracks: []
            })
        }
    })

}
