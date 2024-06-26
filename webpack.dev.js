const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    favicon: 'src/favicon.png'
});

const copyPlugin = new CopyWebpackPlugin({
    patterns: [
        { from: "public", to: "../" },
    ],
});

let plugins = [htmlPlugin, copyPlugin];
plugins.push(
    new webpack.DefinePlugin({
        'PIXLET_API_BASE': JSON.stringify(''),
    })
);

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 3000,
        historyApiFallback: true,
        proxy: [
            {
                context: ['/api'],
                target: 'http://localhost:8080',
                ws: true,
            },
        ],
    },
    plugins: plugins,
});