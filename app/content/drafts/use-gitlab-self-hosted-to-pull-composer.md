Explain how you can use the local gitlab to pull stuff for composer

```
	"repositories": [
		{
			"type": "composer",
			"url": "https://GITLABURL/api/v4/group/59/-/packages/composer/packages.json"
		},
		{
			"type": "path",
			"url": "./packages/*"
		}
	],

	"config": {
		"gitlab-domains": ["GITLABURL"]
	},
```
