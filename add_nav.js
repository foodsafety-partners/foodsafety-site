const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  const menuStr = '<div class="menu">';
  
  if (content.includes(menuStr)) {
    // If it doesn't already have a newsletter link in the menu
    if (!content.includes('newsletter.html">メルマガ</a>')) {
      let replacement = menuStr + '\n        <a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>';
      if (file === 'index.html' || file === 'live_index.html' || file === 'apps.html') {
          // Some files might use relative links
          replacement = menuStr + '\n        <a href="./newsletter.html">メルマガ</a>';
      } else if (file === 'column-food-recall.html' || file === 'lp-food-recall.html') {
          replacement = menuStr + '\n        <a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>';
      } else {
          // default relative if they don't have absolute
          replacement = menuStr + '\n        <a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>';
      }
      content = content.replace(menuStr, replacement);
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
console.log("Done.");
