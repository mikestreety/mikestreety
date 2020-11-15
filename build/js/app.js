import hljs from 'highlight.js/lib/highlight';

hljs.registerLanguage('apache', require('highlight.js/lib/languages/apache'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('dns', require('highlight.js/lib/languages/dns'));
hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'));
hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('smali', require('highlight.js/lib/languages/smali'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));

/**
 * Prism setup
 */
var elements = document.querySelectorAll('pre');
if (elements !== null) {
	Array.prototype.forEach.call(elements, function(el) {
		el.innerHTML = '<code class="' + el.className + '">' + el.innerHTML + '</code>';
	});

	hljs.initHighlightingOnLoad();
}
