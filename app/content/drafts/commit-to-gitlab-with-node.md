
```js
import { Gitlab } from '@gitbeaker/node'; // All Resources
import matter from 'gray-matter';
import fetch from 'node-fetch';

const parse = date => new Date(Date.parse(date));

const slug = str => {
	if(str) {
		str = str.replace(/^\s+|\s+$/g, ''); // trim
		str = str.toLowerCase();

		// remove accents, swap ñ for n, etc
		var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
		var to   = "aaaaeeeeiiiioooouuuunc------";
		for (var i = 0, l = from.length ; i<l ; i++) {
			str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
		}

		str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
			.replace(/\s+/g, '-') // collapse whitespace and replace by -
			.replace(/-+/g, '-'); // collapse dashes
	}

	return str;
}


const api = new Gitlab({
	token: '',
});

fetch('https://alehouse.rocks/api/beers.json')
	.then(data => data.json())
	.then(async data => {
		for(let item of data) {
			let body = item.description ;
			item.image = `/assets/images/${item.code}.webp`

			if(item.hashtags) {
				item.tags = item.hashtags.replaceAll('#', '').split(' ')
			}
			let breweries = [];

			delete item.description;
			delete item.brewery;
			delete item.code;
			delete item.hashtags;

			item.rating = parseInt(item.rating)

			for (let index = 0; index < item.breweries.length; index++) {
				breweries.push(item.breweries[index].slug);
			}
			item.breweries = breweries;

			item.date = item.date.replace('24:', '23:');
			item.date = new Date(item.date.trim()).toISOString().split('T')[0];

			let data = matter.stringify("\n" + body, item);

			console.log(item.title);

			let c = await api.Commits.create(
				25096202,
				'static-data',
				'Adding ' + item.title,
				[
					{
						action: 'create',
						filePath: 'app/content/beer/' + item.date + '-' + slug(item.title) + '.md',
						content: data
					},
				]
			);

		}
	})

```