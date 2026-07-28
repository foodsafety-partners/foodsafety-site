const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We want to add newsletter.html to the global menu.
  // The menu starts with either `<div class="menu">` or `<nav class="menu"`
  
  if (!content.includes('newsletter.html">メルマガ</a>')) {
    // Find the menu block
    const menuIndex = content.indexOf('class="menu"');
    if (menuIndex !== -1) {
      // Find download.html link after the menu start
      const downloadIndex = content.indexOf('download.html', menuIndex);
      if (downloadIndex !== -1 && downloadIndex < menuIndex + 1000) {
        // Find the closing </a> for download.html
        const endAIndex = content.indexOf('</a>', downloadIndex);
        if (endAIndex !== -1) {
          const insertPos = endAIndex + 4;
          const isRelative = content.includes('href="./download.html"');
          const isAbsolute = content.includes('href="https://foodsafety-partners.github.io');
          
          let link = '\n        <a href="newsletter.html">メルマガ</a>';
          if (isAbsolute) {
             link = '\n        <a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>';
          } else if (isRelative) {
             link = '\n        <a href="./newsletter.html">メルマガ</a>';
          }

          content = content.slice(0, insertPos) + link + content.slice(insertPos);
        }
      }
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
console.log("Done.");
