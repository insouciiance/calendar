const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './calendar/src/index.jsx',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/i,
				resolve: { extensions: ['.js', '.jsx'] },
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[local]_[name]_[hash:base64:5]'
							}
						}
					},

					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './calendar/src/index.html'
		})
	],
	optimization: {
		minimizer: [new UglifyJsPlugin()]
	}
};
