const textToImage = require('../')

const font = textToImage.loadFont(__dirname + '\\IndieFlower.ttf')
if (font) {
    textToImage.convert(font, new Date(), 0, 0, 120).then(buffer => {
        require('fs').writeFileSync(path = __dirname + '\\test.png', buffer)
        process.stdout.write(`Done, writing '${path}'`)
    })
}

// Manual testing