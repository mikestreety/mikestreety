const mix = require('laravel-mix');

mix
	.sass('build/css/screen.scss', 'css/style.css')
	.js('build/js/charts.js', 'js/charts.js')
	.js('build/js/unrot-link.js', 'js/unrot-link.js')
	.copyDirectory('build/fonts', 'html/assets/fonts')
	.copyDirectory('build/img', 'html/assets/img')
	.setPublicPath('html/assets');

mix.disableNotifications();
