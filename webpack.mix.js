const mix = require('laravel-mix');

mix
	.sass('build/css/screen.scss', 'html/assets/css/style.css')
	.copyDirectory('build/fonts', 'html/assets/fonts')
	.copyDirectory('build/img', 'html/assets/img')
	.js('build/js/app.js', 'html/assets/js/app.js')
	.setPublicPath('html/assets');

mix.disableNotifications();
