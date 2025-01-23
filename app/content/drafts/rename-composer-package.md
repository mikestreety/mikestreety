
- Make sure all your MRs & issues are tidy. Anything that is on your default/release branch should be tagged and release (this makes the name change _just_ a name change and not bundled with other features)

The process will be:

- Make a release marking the package as abandoned
- Make a new release on the new repo with the new name (this can be the same number if using a new repo)
- Update packagist


How to do it:

1. Make a final release on your current package with all the existing features
2. Clone the repo into a new place (if doing that - e.g. Gitlab / Github or a different org)
3. On the current version/extension update the readme to point to the new extension etc.
4. In your `composer.json` add `"abandoned": "org/new-name"` with your new extension name and update readmes
5. Tag the release and push
6. Go to packagist and mark the package as abandoned
7. If applicable, mark the repo as archived/read-only
8. Update all the details on the new repository/same branch
9. Add the following to show it replaces the old one (stops them both being installed)
```
"replace": {
        "org/old-name": "self.version"
    }
```
1.  Tag and push the new package
2.  Submit the new (or old) repo to packagist

Bonus:

If you're using renovate, you can get it to replace the version for you

```
{
			matchManagers: ['composer'],
			matchPackageNames: ['org/old-name'],
			replacementName: 'org/new-name',
			replacementVersion: '2.3.0'
		},

```
