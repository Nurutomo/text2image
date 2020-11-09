const sharp = require('sharp')
const opentype = require('opentype.js')

module.exports.convert = function (font, text, x = 0, y = 0, size = 72, options) {
    text = text.toString()
    const Default = {
        useSvg: false,
        attr: ''
    }
    options = {...Default, ...options}
    const ascender = font.ascender / font.unitsPerEm * size
    const descender = font.descender / font.unitsPerEm * size
    const path = font.getPath(text, x, ascender + y, size)
    const length = font.getAdvanceWidth(text, size)
    const svg = Buffer.from(`<svg height="${ascender - descender + y}" width="${length + x}" xmlns="http://www.w3.org/2000/svg"><path d="${path.toPathData(8)}" ${options.attr}/></svg>`)
    return new Promise((resolve, reject) => {
        if (options.useSvg) resolve(svg)
        else sharp(svg).png().toBuffer((err, buffer) => {
            if (err) reject(err)
            else resolve(buffer)
        })
    })
}

module.exports.loadFont = function (path) {
    return opentype.loadSync(path)
}