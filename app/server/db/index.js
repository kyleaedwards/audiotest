var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DATABASE_HOST,
    user            : process.env.DATABASE_USER,
    password        : process.env.DATABASE_PASS,
    database        : process.env.DATABASE_NAME
})

var db = {
    pool: pool,
    query: function (query, escapeValues, cb) {
        pool.getConnection(function(err, connection) {
            if (!err && connection) {
                connection.query(query, escapeValues, function(err, rows) {
                    connection.release()
                    cb(err, rows)
                })
            } else {
                console.log(err || "Invalid connection")
            }
        })
    }
}

exports.users = require('./users')(db)
