const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body', // Inyectar los archivos generados al final del body
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [{ from: 'src/assets/images', to: 'assets/images' }],
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		hot: true,
		compress: true, // Habilitar HMR
		port: 9000,
		open: true, // Abre automáticamente el navegador al iniciar el servidor
	},
};
