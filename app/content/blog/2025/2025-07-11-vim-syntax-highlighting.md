---
title: Syntax Highlighting and other enhancements for Vim
intro: How to enable syntax highlighting and other useful features in Vim
tags:
  - Bash
  - CLI
---

Vim is my go-to command-line editor, so it's always useful to have some nice additions including syntax highlighting and nice indenting. It also enables tab behaviour which matches the context.

To do this, create  a `.vimrc` file in your home directory (e.g. `vim ~/.vimrc`) and paste the below

```
syntax on
filetype plugin on

set modeline

set ts=2
set sw=2
set smarttab
set expandtab
set autoindent
set smartindent

" enable showing of matching braces
set showmatch
set mat=5
set list

"Solarized colors!
set background=dark
if ! has('gui_running')
  let g:solarized_termcolors=256
  set t_Co=256
endif
```

This is a file i've copied and pasted between a few machines. So I could So I could fully understand what each line was doing _I used AI_ to explain:

- `⁠syntax on`: Enables syntax highlighting for improved readability of code by color-coding different elements based on their type.
- `⁠filetype plugin on`: Activates file type detection and loads relevant plugins, enhancing functionality based on the type of file being edited.
- `⁠set modeline`: Allows Vim to read modelines (special comments) within files to automatically set options when the file is opened.
- `⁠set ts=2`: Sets the tab size to 2 spaces, determining how many spaces a tab character represents.
- `⁠set sw=2`: Configures the shift width to 2 spaces, defining the number of spaces used for each step of (auto)indentation.
- `⁠set smarttab`: Enables intelligent behavior for the Tab key, adjusting its function based on the context of the line.
- `⁠set expandtab`: Converts tab characters into spaces when the Tab key is pressed, ensuring uniform indentation across different environments.
- `⁠set autoindent`: Automatically inherits the indentation of the previous line for new lines, maintaining consistent formatting.
- `⁠set smartindent`: Provides enhanced automatic indentation for programming languages, particularly useful for C-like languages.
- `⁠set showmatch`: Highlights matching parentheses, brackets, and braces when the cursor is placed on one, aiding in code structure visualization.
- `⁠set mat=5`: Sets the time (in tenths of a second) Vim will wait before highlighting matching braces, with a value of 5 meaning half a second.
- `⁠set list`: Enables the display of whitespace characters (like tabs and spaces) to help visualize formatting issues.
- `⁠set background=dark`: Configures the color scheme to a dark background, improving visibility when using dark themes.
- `⁠if ! has('gui_running')`: Checks if Vim is not running in a graphical user interface (GUI) environment to apply terminal-specific settings.
- `⁠let g:solarized_termcolors=256`: Sets the variable for the Solarized color scheme to use 256 colors when in a terminal.
- `⁠set t_Co=256`: Defines the number of colors supported by the terminal as 256, ensuring compatibility with the Solarized color scheme.
- `⁠endif`: Marks the end of the conditional statement that checks for GUI mode, closing the ⁠if block.
