import hljs from 'highlight.js/lib/core';

import apache from 'highlight.js/lib/languages/apache';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import dns from 'highlight.js/lib/languages/dns';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import http from 'highlight.js/lib/languages/http';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import smali from 'highlight.js/lib/languages/smali';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('apache', apache);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('dns', dns);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('http', http);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('less', less);
hljs.registerLanguage('php', php);
hljs.registerLanguage('plaintext', plaintext);
hljs.registerLanguage('python', python);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('smali', smali);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('yaml', yaml);

/**
 * Prism setup
 */
var elements = document.querySelectorAll('pre');
if (elements !== null) {
	Array.prototype.forEach.call(elements, function(el) {
		if(el.firstChild.tagName !== 'CODE') {
			el.innerHTML = '<code class="' + el.className + '">' + el.innerHTML + '</code>';
		}
	});

	hljs.highlightAll();
}
