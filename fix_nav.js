const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Remove the incorrectly placed link from previous script
  content = content.replace(/\n\s*<a href="\.\/newsletter\.html">メルマガ<\/a>\n\s*<a class="btn primary" href="\.\/download\.html"/g, '\n              <a class="btn primary" href="./download.html"');
  
  content = content.replace(/\n\s*<a href="https:\/\/foodsafety-partners\.github\.io\/foodsafety-site\/newsletter\.html">メルマガ<\/a>\n\s*<a class="btn primary" href="\.\/download\.html"/g, '\n              <a class="btn primary" href="./download.html"');

  // 2. Add it properly to the main nav menu ONLY if it's not already there.
  // The menu always starts with `<nav class="menu"` or `<div class="menu"`
  const hasNavMenu = content.includes('class="menu"');
  if (hasNavMenu) {
      // Find where the menu div ends, or just insert it right after the opening tag
      // It's safer to insert it right before the download button inside the menu.
      const menuStartIndex = content.indexOf('class="menu"');
      const nextDownloadLink = content.indexOf('download.html', menuStartIndex);
      // Ensure the download.html is actually inside the menu (within a few hundred chars)
      if (nextDownloadLink !== -1 && nextDownloadLink < menuStartIndex + 500) {
          // It's inside the menu. Let's see if we already added a link there
          const menuSlice = content.substring(menuStartIndex, nextDownloadLink + 100);
          if (!menuSlice.includes('メルマガ</a>')) {
              // we can insert it.
              // Find the opening <a of the download.html
              const downloadA_Index = content.lastIndexOf('<a', nextDownloadLink);
              if (downloadA_Index > menuStartIndex) {
                  let link = '<a href="newsletter.html">メルマガ</a>\n        ';
                  if (content.includes('href="./download.html"')) {
                      link = '<a href="./newsletter.html">メルマガ</a>\n        ';
                  } else if (content.includes('href="https://')) {
                      link = '<a href="https://foodsafety-partners.github.io/foodsafety-site/newsletter.html">メルマガ</a>\n        ';
                  }
                  content = content.slice(0, downloadA_Index) + link + content.slice(downloadA_Index);
              }
          }
      }
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
