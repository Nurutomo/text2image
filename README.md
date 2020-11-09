# textToImage
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