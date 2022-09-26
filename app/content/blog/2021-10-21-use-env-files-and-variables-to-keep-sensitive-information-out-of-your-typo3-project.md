---
title: "Use env files and variables to keep sensitive information out of your TYPO3 project"
date: 2021-10-21
intro: Environment variables are a great way of keeping sensitive information, such as passwords and API keys out of your project and git repository. Thos blog walks through setting them up with TYPO3
canonical: https://www.liquidlight.co.uk/blog/use-env-files-and-variables-to-keep-sensitive-information-out-of-your-typo3-project/
publication: Liquid Light
permalink: "blog/use-env-files-and-variables-to-keep-sensitive-information-out-of-your-typo3-project/"
tags:
 - TYPO3
 - Composer
---

Environment variables are a great way of keeping sensitive and contextual information out of your project and git repository. You can store private information, such as passwords and API keys out of your git repository as well as storing contextual info, such as if your TYPO3 application is in Development or Production mode.

<div class="info"><strong>Note:</strong> For this blog post you will need a TYPO3 instance running in Composer mode (preferably Git tracked) and will need to be familiar with TYPO3, Composer and Git.</div>

## Installing the package

The main ingredient for this is the [dotenv-connector](https://packagist.org/packages/helhum/dotenv-connector) from Helhum. This package works with any composer project, so knowledge gained from this blog post can be applied elsewhere.

From the root of your project, run the following command:

```bash
composer require helhum/dotenv-connector
```

With the package installed you now have the `$_ENV` array available to you within TYPO3. This reads variables from a `.env` file, `.htaccess` file and several other places.

Once installed, open up your `.gitignore` file and add the following:

`.env*`

This ensures any `.env` file you make won't be committed to your repository by accident. There are some Tips at the end of this post which explains some potential exceptions to that.

## Creating the env file

Create a `.env` file next to your `composer.json` and run a `composer dumpautoload`. This discovers the `.env` file and makes it available in your project. Inside your file, add the following variables

```bash
TYPO3_CONTEXT="Development"

# DB
TYPO3_DB_HOST="localhost"
TYPO3_DB_NAME="db_name"
TYPO3_DB_USER="db_username"
TYPO3_DB_PASSWORD="db_password"
```

**Hint**: The `TYPO3_CONTEXT` variable is immediately picked up by TYPO3 and can alter the caching and output of of your site. You can also use this as a "Feature flag" to modify your code output

## Using the env variables

Within your PHP, you now have `$_ENV` available containing all your variables from your file. The format and usage is endless - we'll run through a couple of common scenarios

### Database

We have the database credentials stored, so we can use them instead of having them stored in `typo3conf/LocalConfiguration.php`.

Remove all the database related credentials from your `LocalConfiguration.php`. Next, open (or create) a `public/typo3conf/AdditionalConfiguration.php` file - in here we can use our `$_ENV` variables:

```php
$TYPO3_CONF_VARS['DB']['Connections']['Default']['host'] = $_ENV['TYPO3_DB_HOST'] ?: 'localhost';
$TYPO3_CONF_VARS['DB']['Connections']['Default']['port'] = $_ENV['TYPO3_DB_PORT'] ?: 3306;

$TYPO3_CONF_VARS['DB']['Connections']['Default']['dbname'] = $_ENV['TYPO3_DB_NAME'];
$TYPO3_CONF_VARS['DB']['Connections']['Default']['user'] = $_ENV['TYPO3_DB_USER'];
$TYPO3_CONF_VARS['DB']['Connections']['Default']['password'] = $_ENV['TYPO3_DB_PASSWORD'];
```

### Debugs

When TYPO3 is in Development mode, we may wish to display more information in the Backend.

We can do this by using the TYPO3 Environment class to get the context

```php
if(!\TYPO3\CMS\Core\Core\Environment::getContext()->isProduction()) {
    $TYPO3_CONF_VARS['BE']['debug'] = 1;
}
```

## Tips

As mentioned, you can use more than one `.env` file to achieve layering. The package we installed has the capacity to implement `.env.local` and other files, for example.

If you wish to use this feature, the following needs to be added to your `composer.json`:

```json
{
    "extra": {
        "helhum/dotenv-connector": {
            "adapter": "Helhum\\DotEnvConnector\\Adapter\\SymfonyLoadEnv"
        }
    }
}
```

This then uses the [Symphony-style loading](https://symfony.com/doc/3.4/components/dotenv.html#usage) for `.env` files.

A couple of use-cases might be:

- If all the sites on one server share the same db user and host, instead of repeating the information you can have them share a file. Create a central `.env` file on the server and symlink it into each project (symlinking is beyond the scope of this blog post, but the are plenty of good tutorials online). You can then create a `.env.local` to specify the Database name
- If you have a set of base/fallback credentials everyone can use for development, you could commit your `.env` file with them included. Live servers could then feature `.env.live` files to override these values

The possibilites with `.env` files is endless - I hope this post has helped you understand how you can use them in TYPO3.
