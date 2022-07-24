const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: {
            import: './src/index.js',
            dependOn: 'shared',
        },
        shared: 'lodash',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'My Awesome application',
            myPageHeader: 'Hello World',
            template: './src/index.html',
            filename: './index.html' //relative to root of the application
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: process.env.NODE_ENV !== "production"
            ? '/'
            : './',
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== "production"
                        ? "style-loader"
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }, {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
};