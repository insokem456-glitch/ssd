const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/class="slider-img"/g, 'class="slider-img" referrerpolicy="no-referrer"');
fs.writeFileSync('index.html', html);
console.log('Added referrerpolicy="no-referrer"');
