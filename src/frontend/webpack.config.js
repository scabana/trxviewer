const path = require('path');
const webpack = require('webpack')
const { VueLoaderPlugin } = require("vue-loader");

let config = {
    entry: './src/vscode-index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.css$/,
                use: ["css-loader"]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'wwwroot/scripts'),
    },
    mode: 'development',
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.mode = 'production';
        config.devtool = 'hidden-source-map';
    }

    return config;
}
