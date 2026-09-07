const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/ggpht\.com\/([a-zA-Z0-9_\-]+)\"/g, 'ggpht.com/$1=s1024"');
fs.writeFileSync('index.html', html);
console.log('Done fixing URLs');
