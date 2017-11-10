const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, 'src/js/index.js'),
	devtool: 'source-map',
	module: {
		rules: [{
			test: /\.less$/,
			use: [{
				loader: 'style-loader',
			}, {
				loader: 'css-loader',
			}, {
				loader: 'less-loader',
			}],
		}],
	},
	plugins: [
		new CleanWebpackPlugin(['www']),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'www'),
	},
}
