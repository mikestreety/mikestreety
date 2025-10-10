import { defineConfig } from 'vite';
import { resolve } from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	build: {
		outDir: 'html/assets',
		emptyOutDir: true,
		rollupOptions: {
			input: resolve(__dirname, 'build/js/main.js'),
			output: {
				entryFileNames: 'js/[name].js',
				assetFileNames: (assetInfo) => {
					const extType = assetInfo.name?.split('.').pop();
					if (extType === 'css') return 'css/style.css';
					if (['woff', 'woff2', 'ttf', 'eot'].includes(extType)) return 'fonts/[name][extname]';
					if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(extType)) return 'img/[name][extname]';
					return '[name][extname]';
				}
			}
		}
	},
	resolve: {
		alias: {
			'/assets/img': resolve(__dirname, 'build/img')
		}
	},
	plugins: [
		viteStaticCopy({
			targets: [
				{ src: 'build/fonts/*', dest: 'fonts' },
				{ src: 'build/img/**/*', dest: 'img' },
				{ src: 'build/js/charts.js', dest: 'js' }
			]
		})
	]
});