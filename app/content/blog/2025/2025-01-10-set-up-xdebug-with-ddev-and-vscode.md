---
title: Set up Xdebug with DDEV and VS Code
intro: Straight-forward config for beginning PHP debugging in VS Code and DDEV
tags:
 - PHP
---

I don't set up Xdebug regularly enough to remember all the steps and processes in place. These steps are documented really well in the [DDEV Documentation](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug) however with those needing to cater to the many, I sometimes get waylaid or confused finding the steps for me.

Before starting, make sure you have installed the [PHP Debug VS Code extension](https://marketplace.visualstudio.com/items?itemName=xdebug.php-debug).
`
1. In the terminal run `code .vscode/launch.json .vscode/tasks.json`
2. In `launch.json`, paste in the contents of the [launch.json file](https://ddev.readthedocs.io/en/stable/users/snippets/launch.json)
3. In `tasks.json` , paste in the contents of the [tasks.json file](https://ddev.readthedocs.io/en/stable/users/snippets/tasks.json)
4. Press F5 (or navigate to the Debug panel and click the ▶️ button)

Using the `tasks.json` this should start xdebug in the ddev container (`ddev xdebug on`) and you should be able to start debugging.

For any further configuration or documentation, check out the [DDEV docs](https://ddev.readthedocs.io/en/stable/users/debugging-profiling/step-debugging/).
