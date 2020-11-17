const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: './src/vscode-index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					appendTsSuffixTo: [/\.vue$/],
				}
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
	// optimization: {
	// 	usedExports: true,
	// },
	mode: 'production',
	plugins: [
		// make sure to include the plugin for the magic
		new VueLoaderPlugin()
	]
};