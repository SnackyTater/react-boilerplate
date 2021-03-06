const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development'
require('dotenv').config({path: path.join(__dirname, 'env', `${environment}.env`)})

module.exports = {
    mode: environment, //process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: path.join(__dirname, "src/index.js"), //'./app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public') 
        },
        port: 3000,
		historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.svg$/, 
                use: 'svg-inline-loader'
            },
            {
                test: /\.css$/, 
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/, 
                use: {
                    loader: 'babel-loader'
                }, 
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
    ],
    resolve: {
        alias: {
            'react-router-dom': path.resolve('./node_modules/react-router-dom'),
        },
        extensions: ['.js', '.jsx'],
    },
}