const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function compareAfterMigration() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('Navigating to http://localhost:8080 (new Vite version)...');
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

    // Wait for dynamic content
    await page.waitForTimeout(2000);

    const comparisonDir = path.join(__dirname, 'vite-migration-comparison');
    if (!fs.existsSync(comparisonDir)) {
      fs.mkdirSync(comparisonDir);
    }

    console.log('Taking new screenshots...');
    await page.screenshot({
      path: path.join(comparisonDir, 'homepage-full-page-AFTER.png'),
      fullPage: true
    });

    await page.screenshot({
      path: path.join(comparisonDir, 'homepage-viewport-AFTER.png'),
      fullPage: false
    });

    console.log('Capturing new HTML...');
    const html = await page.content();
    fs.writeFileSync(path.join(comparisonDir, 'homepage-AFTER.html'), html);

    console.log('Capturing new computed styles...');
    const keyElements = [
      { selector: 'body', name: 'body' },
      { selector: 'header', name: 'header' },
      { selector: 'main', name: 'main' },
      { selector: 'footer', name: 'footer' },
      { selector: 'nav', name: 'navigation' },
      { selector: '.container', name: 'container' },
      { selector: '.content', name: 'content' },
      { selector: 'h1', name: 'h1' },
      { selector: 'h2', name: 'h2' },
      { selector: 'h3', name: 'h3' },
      { selector: 'p', name: 'paragraph' },
      { selector: 'a', name: 'link' },
      { selector: 'button', name: 'button' },
      { selector: '.btn', name: 'btn-class' },
      { selector: '.card', name: 'card' },
      { selector: '.post', name: 'post' },
      { selector: '.sidebar', name: 'sidebar' },
      { selector: '.menu', name: 'menu' }
    ];

    const newStylesData = {};

    for (const element of keyElements) {
      try {
        const elementHandle = await page.$(element.selector);
        if (elementHandle) {
          const styles = await page.evaluate((el) => {
            const computedStyle = window.getComputedStyle(el);
            const relevantStyles = {};

            const importantProps = [
              'display', 'position', 'width', 'height', 'margin', 'padding',
              'border', 'background', 'color', 'font-family', 'font-size',
              'font-weight', 'line-height', 'text-align', 'flex-direction',
              'align-items', 'justify-content', 'grid-template-columns',
              'gap', 'z-index', 'overflow', 'box-shadow', 'border-radius'
            ];

            importantProps.forEach(prop => {
              const value = computedStyle.getPropertyValue(prop);
              if (value && value !== 'none' && value !== 'auto' && value !== 'initial') {
                relevantStyles[prop] = value;
              }
            });

            return relevantStyles;
          }, elementHandle);

          newStylesData[element.name] = {
            selector: element.selector,
            styles: styles
          };
        }
      } catch (error) {
        console.log(`Could not capture styles for ${element.selector}: ${error.message}`);
      }
    }

    fs.writeFileSync(
      path.join(comparisonDir, 'key-element-styles-AFTER.json'),
      JSON.stringify(newStylesData, null, 2)
    );

    // Load original styles for comparison
    const originalStylesPath = path.join(__dirname, 'vite-migration-reference', 'key-element-styles.json');
    if (fs.existsSync(originalStylesPath)) {
      const originalStyles = JSON.parse(fs.readFileSync(originalStylesPath, 'utf8'));

      console.log('\\n=== STYLE COMPARISON REPORT ===');

      const differences = {};
      let hasDifferences = false;

      for (const [elementName, newData] of Object.entries(newStylesData)) {
        if (originalStyles[elementName]) {
          const originalStylesForElement = originalStyles[elementName].styles;
          const newStylesForElement = newData.styles;
          const elementDiffs = {};

          // Check for differences in each style property
          const allProps = new Set([
            ...Object.keys(originalStylesForElement),
            ...Object.keys(newStylesForElement)
          ]);

          for (const prop of allProps) {
            const originalValue = originalStylesForElement[prop];
            const newValue = newStylesForElement[prop];

            if (originalValue !== newValue) {
              elementDiffs[prop] = {
                before: originalValue || 'undefined',
                after: newValue || 'undefined'
              };
              hasDifferences = true;
            }
          }

          if (Object.keys(elementDiffs).length > 0) {
            differences[elementName] = elementDiffs;
          }
        }
      }

      if (hasDifferences) {
        console.log('\\n⚠️  STYLE DIFFERENCES DETECTED:');
        for (const [element, diffs] of Object.entries(differences)) {
          console.log(`\\n${element.toUpperCase()}:`);
          for (const [prop, values] of Object.entries(diffs)) {
            console.log(`  ${prop}:`);
            console.log(`    Before: ${values.before}`);
            console.log(`    After:  ${values.after}`);
          }
        }

        fs.writeFileSync(
          path.join(comparisonDir, 'style-differences.json'),
          JSON.stringify(differences, null, 2)
        );
      } else {
        console.log('\\n✅ NO STYLE DIFFERENCES DETECTED - Migration successful!');
      }
    }

    console.log(`\\nComparison files saved to: ${comparisonDir}`);
    console.log('\\nNext steps:');
    console.log('1. Visually compare the BEFORE and AFTER screenshots');
    console.log('2. Review any style differences reported above');
    console.log('3. Check that all assets load correctly');

  } catch (error) {
    console.error('Error during comparison:', error);
  } finally {
    await browser.close();
  }
}

compareAfterMigration();