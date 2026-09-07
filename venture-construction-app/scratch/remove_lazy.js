const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/ loading="lazy"/g, '');
fs.writeFileSync('index.html', html);
console.log('Removed loading="lazy"');
