const path = require('path')

module.exports = {

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, '.', 'build'),
        publicPath: '/build/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel",
            include: __dirname,
            query: {
                presets: [ 'es2015', 'react', 'react-hmre' ]
            }
        }]
    }

}
