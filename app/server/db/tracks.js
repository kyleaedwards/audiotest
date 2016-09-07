var bcrypt = require('bcrypt')

module.exports = function (db) {

    return {

        create: function(track, cb) {

            var fields = [],
                values = [],
                wildcards = []

            track.slug = track.title.toLowerCase()
            track.slug = track.slug.replace(/[ :\.\\\\\\\/\[\]\{\}\(\)-+=_]/gi, '-')
            track.slug = track.slug.replace(/--+/, '-')

            for (var key in track) {
                fields.push(`\`${key}\``)
                values.push(track[key])
                wildcards.push('?')
            }

            fields = fields.join(', ')
            wildcards = wildcards.join(', ')

            var query = `INSERT INTO co_tracks (${fields}) VALUES (${wildcards})`
            console.log(query)
            db.query(query, values, cb)

        },

        getByUser: function (user_id, cb) {
            db.query('SELECT * FROM co_tracks WHERE user_id = ?', [user_id], cb)
        },

        getBySlug: function (slug, user_id, cb) {
            db.query('SELECT * FROM co_tracks WHERE user_id = ? AND slug = ?', [user_id, slug], cb)
        }

    }

}
