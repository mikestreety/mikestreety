module.exports = () => {
	const popular_posts = {
		'2024': [
			'/blog/migrating-gitlab-from-one-server-to-another/',
			'/blog/npm-install-without-modifying-package-lock/',
			'/blog/git-clone-a-repository-without-the-history/',
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/validate-a-json-api-with-playwright-and-json-schema/',
			'/blog/deploying-a-docker-image-to-a-remote-private-registry-with-gitlab-ci/',
			'/blog/the-git-commit-hash/',
			'/blog/using-private-docker-registry-gitlab-ci/',
			'/blog/login-with-puppeteer-and-re-use-cookies-for-another-window/',
			'/blog/build-and-push-a-docker-image-to-a-private-registry-with-gitlab-ci/'
		],

		'2023': [
			'/blog/migrating-gitlab-from-one-server-to-another/',
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/the-git-commit-hash/',
			'/blog/using-private-docker-registry-gitlab-ci/',
			'/blog/build-and-push-a-docker-image-to-a-private-registry-with-gitlab-ci/',
			'/blog/npm-install-without-modifying-package-lock/',
			'/blog/use-minio-to-cache-gitlab-containers-and-runners/',
			'/blog/add-custom-repositories-for-composer-to-pull-from/',
			'/blog/how-to-use-fetch-in-javascript-to-get-or-post-data/',
			'/blog/posting-to-slack-from-gitlab-ci/'
		],

		'2022': [
			'/blog/migrating-gitlab-from-one-server-to-another/',
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/the-git-commit-hash/',
			'/blog/using-private-docker-registry-gitlab-ci/',
			'/blog/how-to-set-up-and-use-laravel-mix-with-your-project/',
			'/blog/how-to-use-fetch-in-javascript-to-get-or-post-data/',
			'/blog/creating-a-docusaurus-docker-image-for-consistent-rendering-of-your-documentation/',
			'/blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path/'
		],

		'2021': [
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/migrating-gitlab-from-one-server-to-another/',
			'/blog/how-to-use-fetch-in-javascript-to-get-or-post-data/',
			'/blog/the-git-commit-hash/',
			'/blog/how-to-set-up-and-use-laravel-mix-with-your-project/',
			'/blog/setting-up-a-custom-domain-with-netlify-with-cloudflare-ssl/',
			'/blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path/',
			'/blog/multiple-transition-delay/',
			'/blog/get-eleventy-up-and-running-on-netlify-or-cloudflare-pages/',
			'/blog/creating-an-11ty-collection-from-json-api/'
		],

		'2020': [
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/how-to-use-fetch-in-javascript-to-get-or-post-data/',
			'/blog/the-git-commit-hash/',
			'/blog/multiple-transition-delay/',
			'/blog/github-for-pc-and-setting-up-a-local-testing-environment/',
			'/blog/use-a-raspberry-pi-with-multiple-wifi-networks/',
			'/blog/vue-js-filters-what-are-they-how-do-you-use-them-and-how-do-you-make-them-video/',
			'/blog/get-background-image-information-if-element-has-a-one-in-jquery/',
			'/blog/filtering-tables/',
			'/blog/using-cloudflare-workers-to-set-a-cookie-based-on-a-get-parameter-or-path/'
		],

		'2019': [
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/multiple-transition-delay/',
			'/blog/github-for-pc-and-setting-up-a-local-testing-environment/',
			'/blog/get-background-image-information-if-element-has-a-one-in-jquery/',
			'/blog/use-a-raspberry-pi-with-multiple-wifi-networks/',
			'/blog/introduction-to-vuex-managing-state-storage-and-sharing-data-between-components/',
			'/blog/vue-js-filters-what-are-they-how-do-you-use-them-and-how-do-you-make-them-video/',
			'/blog/filtering-tables/',
			'/blog/using-dynamic-and-static-attributes-and-props-with-components-and-html-elements-video/',
			'/blog/dont-require-password-for-sudo-commands-as-non-root-user/'
		],
		'2018': [
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/use-a-raspberry-pi-with-multiple-wifi-networks/',
			'/blog/introduction-to-vuex-managing-state-storage-and-sharing-data-between-components/',
			'/blog/advanced-gulp-file/',
			'/blog/get-background-image-information-if-element-has-a-one-in-jquery/',
			'/blog/multiple-transition-delay/',
			'/blog/vue-js-filters-what-are-they-how-do-you-use-them-and-how-do-you-make-them-video/',
			'/blog/filtering-tables/',
			'/blog/a-simple-sass-compilation-gulpfile-js/',
			'/blog/introduction-to-vuex-implementation-part-2-video/'
		],

		'2017': [
			'/blog/use-a-raspberry-pi-with-multiple-wifi-networks/',
			'/blog/advanced-gulp-file/',
			'/blog/a-simple-sass-compilation-gulpfile-js/',
			'/blog/vue-js-using-localstorage-with-the-vuex-store/',
			'/blog/css-custom-properties-everyday-applications/',
			'/blog/using-props-for-accessing-url-parameters-within-components-with-vue-router/',
			'/blog/vue-js-filters-what-are-they-how-do-you-use-them-and-how-do-you-make-them-video/',
			'/blog/get-background-image-information-if-element-has-a-one-in-jquery/',
			'/blog/raspberry-pi-timelapse/',
			'/blog/filtering-tables/'
		]
	};

	let posts_output = [];

	for(let current_year in popular_posts) {

		let year_format = {
				title: current_year,
				posts: []
			},
			year = popular_posts[current_year];

		previous_year = popular_posts[current_year - 1] ? popular_posts[current_year - 1] : false,
		post_index = 1;

		for(let post of year) {

			let previous_place = (previous_year !== false && previous_year.includes(post)) ? (previous_year.indexOf(post) + 1) : false,
				position_change = previous_place ? previous_place - post_index : false;

			year_format.posts.push({
				slug: post,
				position: post_index,
				position_change
			});

			post_index++;
		}

		posts_output.push(year_format);
	}

	return {
		posts: posts_output.reverse()
	};
};
