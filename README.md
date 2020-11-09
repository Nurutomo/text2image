# text2image
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FNurutomo%2Ftext2image&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)
Installation:
    npm i image2text

Usage:
```js
const image2text = require('image2text')
```

Load font
```js
const font = text2image.loadFont('path/to/font.ttf')
```

Converting text to image
```js
// PNG
text2image.convert(font, 'Hello, World!', 0, 0, 72).then(buffer => {
    fs.writeFileSync('hello_world.png', buffer) // <Buffer 89 50 4e ...
})
 
// SVG
text2image.convert(font, 'Hello, World!', 0, 0, 72, { useSvg: true }).then(buffer => {
    fs.writeFileSync('hello_world.svg', buffer) // <Buffer 3c 73 76 ...
})
```