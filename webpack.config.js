const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    module: {
        rules: [
        {
            test: require.resolve('snapsvg/dist/snap.svg.js'),
            use: 'imports-loader?this=>window,fix=>module.exports=0',
        },
        ],
    },
    resolve: {
        alias: {
        snapsvg: 'snapsvg/dist/snap.svg.js',
        },
    },
};
module.exports = config;