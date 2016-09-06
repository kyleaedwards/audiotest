const Webpack   = require('webpack')
const bourbon   = require('bourbon').includePaths
const path      = require('path')

module.exports = {

    devtool: 'eval',

    entry: [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://cellout.dev:7081',
        path.resolve(__dirname, './client', 'src', 'index.js'),
    ],

    output: {
        path: path.resolve(__dirname, './client', 'build'),
        filename: 'bundle.js',
        publicPath: "http://cellout.dev:7080/build/"
    },

    module: {

        loaders: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel']
            },

            {
                test: /\.scss$/,
                loaders: ['react-hot', 'style', 'css', `sass?includePaths[]=${bourbon}`]
            },

            {
                test: /\.css$/,
                loader: 'style!css'
            },

            {
                test: /\.json$/,
                loaders: ['json'],
            }

        ]

    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, './client', 'scss')]
    },

    plugins: [new Webpack.HotModuleReplacementPlugin()]

}
