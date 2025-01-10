---
title: Set up Xdebug with DDEV and VS Code
intro: Straight-forward config for beginning PHP debugging in VS Code and DDEV
tags:
 - PHP
---

I don't set up Xdebug regularly enough to remember all the steps and processes in place. These steps are documented really well in the [DDEV Documentation](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug) however with those needing to cater to the many, I sometimes get waylaid or confused finding the steps for me.

Before starting, make sure you have installed the [PHP Debug VS Code extension](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug).

1. In the terminal run `code .vscode/launch.json .vscode/tasks.json`
2. In `launch.json` file, paste in the contents of the [launch.json file](https://ddev.readthedocs.io/en/stable/users/snippets/launch.json) (see below)
3. In `tasks.json` file, paste in the contents of the [tasks.json file](https://ddev.readthedocs.io/en/stable/users/snippets/tasks.json) (see below)
4. Press F5 (or navigate to the Debug panel and click the ▶️ button)

Using the `tasks.json` this should start xdebug in the ddev container (`ddev xdebug on`) and you should be able to start debugging.

For any further configuration or documentation, check out the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/).

## Files

File contents copied here for ease/speed

### `launch.json`

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Listen for Xdebug",
            "type": "php",
            "request": "launch",
            "hostname": "0.0.0.0",
            "port": 9003,
            "pathMappings": {
                "/var/www/html": "${workspaceFolder}"
            },
            "preLaunchTask": "DDEV: Enable Xdebug",
            "postDebugTask": "DDEV: Disable Xdebug"
        }
    ]
}
```

### `tasks.json`

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "DDEV: Enable Xdebug",
            "type": "shell",
            "command": "ddev xdebug on"
        },
        {
            "label": "DDEV: Disable Xdebug",
            "type": "shell",
            "command": "ddev xdebug off"
        }
    ]
}
```
