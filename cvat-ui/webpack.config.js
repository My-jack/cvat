/*
 * Copyright (C) 2019 Intel Corporation
 * SPDX-License-Identifier: MIT
*/

/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    entry:[
        'react-hot-loader/patch',
        require.resolve('./src/index.tsx'),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'cvat-ui.min.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        inline: true,
        port: 7000,
        host: '0.0.0.0',
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                secure: false,
                changeOrigin: true
            }
          }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/plugin-proposal-class-properties', ['import', {
                        'libraryName': 'antd',
                    }],
                    'react-hot-loader/babel'],
                    presets: [
                        ['@babel/preset-env', {
                            targets: {
                                chrome: 58,
                            },
                        }],
                        ['@babel/preset-react'],
                        ['@babel/typescript'],
                    ],
                    sourceType: 'unambiguous',
                },
            },
        }, {
            test: /\.(css|sass)$/,
            use: ['style-loader', 'css-loader']
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./src/index.html",
          inject: false,
        }),
        new Dotenv({
            systemvars: true,
        }),
    ],
    node: { fs: 'empty' },
};