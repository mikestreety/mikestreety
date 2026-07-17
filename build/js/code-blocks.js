/**
 * Progressive enhancement for server-highlighted Prism code blocks.
 * Adds a fixed line-number gutter and a copy-to-clipboard button
 * without re-running Prism (which is already done at build time).
 */
function enhanceCodeBlock(pre) {
	const code = pre.querySelector('code[class*="language-"]');
	if (!code) return;

	// Capture the raw source before any DOM changes, so the copy
	// button never has a chance to pick up line numbers or UI chrome.
	const source = code.textContent.replace(/\n$/, '');
	const lines = source.split('\n');

	const wrapper = document.createElement('div');
	wrapper.className = 'code-block';
	pre.parentNode.insertBefore(wrapper, pre);
	wrapper.appendChild(pre);
	pre.classList.add('code-block__pre');

	if (lines.length > 1) {
		const gutter = document.createElement('span');
		gutter.className = 'line-numbers-rows';
		gutter.setAttribute('aria-hidden', 'true');
		for (let i = 0; i < lines.length; i++) {
			gutter.appendChild(document.createElement('span'));
		}
		wrapper.classList.add('code-block--numbered');
		wrapper.appendChild(gutter);
	}

	const toolbar = document.createElement('div');
	toolbar.className = 'code-block__toolbar';

	const copyButton = document.createElement('button');
	copyButton.type = 'button';
	copyButton.className = 'code-block__copy';
	copyButton.textContent = 'Copy';
	copyButton.addEventListener('click', () => {
		navigator.clipboard.writeText(source).then(() => {
			copyButton.textContent = 'Copied!';
			copyButton.classList.add('code-block__copy--done');
			setTimeout(() => {
				copyButton.textContent = 'Copy';
				copyButton.classList.remove('code-block__copy--done');
			}, 2000);
		});
	});

	toolbar.appendChild(copyButton);
	wrapper.appendChild(toolbar);
}

document.querySelectorAll('pre[class*="language-"]').forEach(enhanceCodeBlock);
