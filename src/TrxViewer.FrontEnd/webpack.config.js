const path = require('path');

module.exports = {
	entry: './Scripts/vscode-index.ts',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.ts$/i,
				use: [
					{
						loader: 'ts-loader'
					}
				],
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: ['Scripts', 'node_modules']
	},
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'wwwroot/scripts'),
	},
	// optimization: {
	// 	usedExports: true,
	// },
	mode: 'production'
};