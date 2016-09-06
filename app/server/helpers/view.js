var path = require('path')

module.exports = function (res, view) {
    res.sendFile(path.join(__dirname, '../..', `client/${view}.html`))
}
