const mix = require('laravel-mix');

mix
	.sass('build/css/screen.scss', 'css/style.css')
	.copyDirectory('build/fonts', 'html/assets/fonts')
	.copyDirectory('build/img', 'html/assets/img')
	.setPublicPath('html/assets');

mix.disableNotifications();
