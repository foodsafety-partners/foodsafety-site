const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'newsletter.html');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Patterns to look for in order to insert the newsletter link right after "無料DL" or right before "無料でアプリを使う" or inside the menu
  
  if (!content.includes('>メルマガ</a>')) {
      // 1. In index.html, it has: `<a class="btn primary" href="./download.html"`
      if (content.includes('<a class="btn primary" href="./download.html"')) {
          content = content.replace(
              '<a class="btn primary" href="./download.html"',
              '<a href="./newsletter.html">メルマガ</a>\n            <a class="btn primary" href="./download.html"'
          );
      }
      // 2. Generic <a href="...download.html">無料DL</a>
      else if (content.includes('>無料DL</a>')) {
          content = content.replace(
              /(<a[^>]*href=["'][^"']*download\.html["'][^>]*>無料DL<\/a>)/,
              '$1\n        <a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>'
          );
      }
      else if (content.includes('href="./download.html"')) {
          content = content.replace(
              /(<a[^>]*href=["']\.\/download\.html["'][^>]*>.*?<\/a>)/,
              '$1\n            <a href="./newsletter.html">メルマガ</a>'
          );
      }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
