const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: ['@babel/polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	mode: 'development',
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/img', to: 'img' }
		]),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: [/.css$|.less$/],
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'postcss-less-loader'
				]
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
	}
};