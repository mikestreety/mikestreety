let mix = require('laravel-mix');

require('laravel-mix-imagemin');
const ImageMinWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

mix
	.sass('build/css/screen.scss', 'html/assets/css/style.css')
	// .copyDirectory('build/fonts', 'html/assets/fonts')
	.js('build/js/app.js', 'html/assets/js/app.js')
	// .imagemin({
	// 	from: 'img/**/*'
	// }, {
	// 	context: 'build'
	// })
	// .webpackConfig({
	// 	plugins: [
	// 		new ImageMinWebpWebpackPlugin({
	// 			config: [
	// 				{
	// 					test: /(img).*\.(jpe?g|png)/,
	// 					options: {
	// 						quality: 80
	// 					}
	// 				}
	// 			]
	// 		})
	// 	]
	// })
	.setPublicPath('html/assets');

mix.disableNotifications();
