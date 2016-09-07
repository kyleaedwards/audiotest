var bcrypt = require('bcrypt')

module.exports = function (db) {

    return {

        create: function(user, cb) {

            bcrypt.hash(user.password, 10, function(err, hash) {

                if (err) {
                    return cb(err)
                }

                var query = `INSERT INTO co_users (handle, email, hash) VALUES (?, ?, ?)`
                var escapeValues = [user.handle, user.email, hash]
                db.query(query, escapeValues, cb)

            })

        },

        findById: function(id, cb) {
            var query = `SELECT * FROM co_users WHERE id = ?`
            var escapeValues = [id]
            db.query(query, escapeValues, function (err, rows) {
                if (err) {
                    cb(err)
                } else if (rows && rows[0]) {
                    cb(null, rows[0])
                } else {
                    cb(null, false)
                }
            })
        },

        findByEmail: function(email, cb) {
            var query = `SELECT * FROM co_users WHERE email = ?`
            var escapeValues = [handle]
            db.query(query, escapeValues, function (err, rows) {
                if (err) {
                    cb(err)
                } else if (rows && rows[0]) {
                    cb(null, rows[0])
                } else {
                    cb(null, false)
                }
            })
        },

        auth: function(email, password, cb) {
            var query = `SELECT * FROM co_users WHERE handle = ? OR email = ?`
            var escapeValues = [email, email]
            db.query(query, escapeValues, function (err, rows) {
                if (err) {
                    cb(null, false)
                } else if (rows && rows[0] && rows[0].hash) {
                    bcrypt.compare(password, rows[0].hash, function (err, res) {
                        if (err) {
                            cb(null, false)
                        } else {
                            cb(null, rows[0])
                        }
                    })
                } else {
                    cb(null, false)
                }
            })
        }

    }

}
