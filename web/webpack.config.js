const {resolve} = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function(env) {

    const prod = env !== undefined && env.production === true;
    const plugins = [];

    if (!prod) {
        plugins.push(
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: "./mail.html",
                title: 'Mail',
            }));
        plugins.push(
            new CopyWebpackPlugin([
                {from: 'static'}
            ]));
    }

    plugins.push(new VueLoaderPlugin());

    return {
        entry: {
            mail: './src/mail.ts'
        },
        output: {
            path: prod ? resolve(__dirname, "../public/") : resolve(__dirname, "dist/"),
            filename: prod ? "[name].bundle.js" : "[name].js",
        },

        mode: prod ? 'production' : 'development',

        devServer: {
            port: 8001,
            host: '0.0.0.0',
            hot: true,
            open: false,
            static: {
                directory: resolve(__dirname, 'src')
            },
        },

        devtool: prod ? "source-map" : "eval-cheap-module-source-map",
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader', 'css-loader', 'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/env'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    }
                },
                {
                    test: /\.vue$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "vue-loader",
                    }
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                },
            ]
        },

        resolve: {
            extensions: ['.vue', '.ts', '.js']
        },

        plugins: plugins
    };
}
