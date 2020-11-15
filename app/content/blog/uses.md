---
title: Uses
published: 2018-8-13
updated: 2018-11-21
intro: I've had a few questions regarding what apps I use with which themes and settings. This is an up-to-date blog post with the answers.
tags:
 - Web
 - Front-end Development
---

​I've had a few questions regarding what editor/terminal apps I use, with themes and settings. This is an up-to-date blog post with the answers.

## Code Editor

<figure class="block-img"><img src="https://www.mikestreety.co.uk/cpresources/a36b76b2/atom-screenshot.png?v=1534404225" alt="Screenshot of Atom IDE"><figcaption>Screenshot of my Atom text editor</figcaption></figure>


My code editor of choice is [Atom](https://atom.io/).

- **UI Theme:** One Dark
- **Syntax Theme:** One Dark
- **Font:** Cousine (which is a [Google Font](https://fonts.google.com/specimen/Cousine))

### Config

I also use hard tabs and show invisibles, to help with indenting and identifying when it is not up to scratch! My full Atom config can be found below:

<details>
<summary>Full Atom config file</summary>
<pre class="language-js">"*":
  "atom-beautify":
    css: {}
    general:
      beautifyEntireFileOnSave: false
    html: {}
    scss: {}
    vue: {}
  "autocomplete-plus":
    confirmCompletion: "tab"
    strictMatching: true
  core:
    automaticallyUpdate: false
    disabledPackages: [
      "atom-typescript"
      "csslint"
      "language-liquid"
      "emmet"
      "linter-htmlhint"
      "devdocs"
    ]
    restorePreviousWindowsOnStart: "no"
    telemetryConsent: "no"
    themes: [
      "pristine-ui"
      "one-dark-syntax"
    ]
    titleBar: "custom"
  csslint:
    validateOnChange: true
  editor:
    fontFamily: "Cousine"
    fontSize: 12
    invisibles: {}
    showIndentGuide: true
    showInvisibles: true
    softTabs: false
    softWrap: true
    tabLength: 4
    tabType: "hard"
  emmet: {}
  "exception-reporting":
    userId: "3ffdb73e-c23e-9d0d-3f06-e3c9e7b40602"
  "file-icons":
    forceShow: true
  "flex-tool-bar": {}
  "git-go": {}
  "git-plus": {}
  linter:
    statusBar: "Show error if the cursor is in range"
  "linter-eslint":
    disableEslintIgnore: true
    disableWhenNoEslintConfig: false
    eslintRulesDirs: [
      "/Users/mike/"
    ]
    eslintrcPath: "/js-lint/rules-eslint.js"
    globalNodePath: "/usr/local"
    useGlobalEslint: true
  "linter-sass-lint":
    globalNodePath: "/usr/local"
  "linter-scss-lint":
    configName: "/tpl/lint-config.yml"
  "linter-stylelint":
    disableWhenNoConfig: false
  "linter-ui-default":
    panelHeight: 155.125
  minimap:
    plugins:
      bookmarks: true
      bookmarksDecorationsZIndex: 0
      codeglance: false
      codeglanceDecorationsZIndex: 0
      "find-and-replace": true
      "find-and-replaceDecorationsZIndex": 0
      "git-diff": true
      "git-diffDecorationsZIndex": 0
      "highlight-selected": true
      "highlight-selectedDecorationsZIndex": 0
      linter: true
      linterDecorationsZIndex: 0
      pigments: true
      pigmentsDecorationsZIndex: 0
  "one-dark-ui": {}
  "package-sync":
    createOnChange: true
  pigments:
    autocompleteScopes: [
      "_variables.scss"
    ]
    groupPaletteColors: "by file"
    notifyReloads: false
    sortPaletteColors: "by name"
  "prettier-atom":
    formatOnSaveOptions: {}
    prettierEslintOptions:
      prettierLast: true
    prettierOptions:
      bracketSpacing: false
      printWidth: 170
      singleQuote: true
      useTabs: true
    useEditorConfig: false
    useEslint: true
  "pristine-ui": {}
  "project-manager":
    includeGitRepositories: true
    sortBy: "group"
  "svg-preview": {}
  "tool-bar":
    iconSize: "16px"
    position: "Left"
    visible: false
  "tree-view":
    hideVcsIgnoredFiles: false
    showOnRightSide: false
  "web-browser": {}
  welcome:
    showOnStartup: false
  whitespace:
    ensureSingleTrailingNewline: false
".diff.source":
  editor:
    tabLength: 4
".source.typoscript":
  editor:
    softTabs: true
    tabLength: 2
    tabType: "soft"
</pre>
</details>

### Snippets

I make use of snippets to save those extra few character strokes.

<details>
<summary>Atom Snippets</summary>
<pre class="language-js">'.source.js':
  'console.log':
    'prefix': 'log'
    'body': 'console.log(${1});'


'.source.scss':

  'margin-right':
    'prefix': 'mr'
    'body': 'margin-right: ${1}'

  'background':
    'prefix': 'back'
    'body': 'background: ${1}'

  'CSS custom variable':
    'prefix': 'var'
    'body': 'var(--${1})'
</pre>
</details>

### Keymap

My keymap file has a few custom modifications for quick formatting.

<details>
<summary>Atom Keymaps</summary>
<pre class="language-js">'atom-text-editor':
	'ctrl-cmd-]': 'editor:auto-indent'

'atom-text-editor:not([data-grammar*="js"]):not([data-grammar*="vue"])':
	'ctrl-cmd-[': 'atom-beautify:beautify-editor'

'atom-text-editor[data-grammar*="js"]':
	'ctrl-cmd-[': 'prettier:format'

'atom-text-editor[data-grammar*="vue"]':
	'ctrl-cmd-[': 'prettier:format'
</pre>
</details>

### Packages

And lastly, the packages I have installed. When setting up a new machine, I copy across the `pakages.cson` and use [package-sync](https://github.com/lee-dohm/package-sync) to install them all.

<details>
<summary>Atom Packages</summary>
<pre class="language-js">packages: [
  "ascii-unicode-escape"
  "autocomplete"
  "autocomplete-php"
  "autocomplete-sass"
  "busy-signal"
  "compare-files"
  "css-snippets"
  "delete-lines"
  "docblockr"
  "dracula-syntax"
  "file-icons"
  "git-plus"
  "highlight-selected"
  "html-entities"
  "intentions"
  "isotope-ui"
  "jquery-snippets"
  "language-diff"
  "language-twig"
  "language-vue"
  "linter"
  "linter-eslint"
  "linter-php"
  "linter-scss-lint"
  "linter-ui-default"
  "minimap"
  "minimap-bookmarks"
  "minimap-find-and-replace"
  "minimap-git-diff"
  "minimap-highlight-selected"
  "minimap-linter"
  "minimap-pigments"
  "package-sync"
  "pigments"
  "prettier-atom"
  "pristine-ui"
  "project-manager"
  "space-tab"
  "split-diff"
  "typo3"
]
</pre>
</details>