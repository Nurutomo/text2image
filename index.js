const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const { toPoints, toPath } = require('svg-points')
const { boundingBox, offset } = require('points')
const opentype = require('opentype.js')
const emojiRegex = require('emoji-regex/RGI_Emoji.js')()
// const emojiData = require('./emoji-data.json')

module.exports.convert = async function (font = new opentype.Font(), text = '', x = 0, y = 0, size = 72, options) {
    text = text.toString()//.replace(emojiRegex, '?')
    // text = text.replace(emojiRegex, (emoji, index) => {
    //     a = find(emoji)
    //     emojiIndexs.push([index + modIndex, emojiData.indexOf(a ? a : find([...emoji][0])), emoji.length, false])
    //     modIndex -= emoji.length - 1
    //     return '+'
    // })
    const ascender = font.ascender / font.unitsPerEm * size
    const descender = font.descender / font.unitsPerEm * size
    const Default = {
        attr: '',
        lineHeight: font.height / font.unitsPerEm * size,
        align: 'left',
        useSvg: false,
        padding: 0,
        prepend: '',
        append: '',
        // emoji: true,
    }
    options = { ...Default, ...options }
    options.align = options.align.toLowerCase()
    if (options.padding > 0) {
        x += options.padding
        y += options.padding
    }
    let points = []
    let paths = []
    let maxWidth = 0
    let maxHeight = 0
    const lines = text.includes`\n` ? text.split`\n` : [text]
    for (let i in lines) {
        points.push({
            point: toPoints({
                type: 'path',
                d: font.getPath(lines[i], 0, 0, size).toPathData(),
            }),
            width: font.getAdvanceWidth(lines[i], size)
        })
        maxWidth = Math.max(maxWidth, font.getAdvanceWidth(lines[i], size))
    }


    if (options.padding > 0) {
        maxWidth += options.padding * 2
    }
    let yMin = Infinity
    for (let i in points) {
        let { point, width } = points[i]
        let left = 0
        let xAlign
        let yAlign = ascender - descender + y
        yAlign += options.lineHeight * i
        if (options.align == 'center') xAlign = (maxWidth - width) / 2 + x - left
        else if (options.align == 'left' || options.align == 'start') xAlign = x - left
        else if (options.align == 'right' || options.align == 'end') xAlign = (maxWidth - width) + x - left
        point = offset(point, xAlign, yAlign)
        yMin = Math.min(yMin, boundingBox(point).top)
        paths.push(`<path d="${toPath(point)}"${options.attr ? ' ' + options.attr : ''}/>`)
        maxHeight = Math.max(maxHeight, boundingBox(point).bottom + options.padding * 2)
    }
    // TODO: Emoji
    // imageEmoji = [{
    //     input: dataURI2Buffer(find().windows)
    // }]
    // console.log(maxWidth, maxHeight)
    const svg = Buffer.from(`<svg width="${maxWidth}" height="${maxHeight}" xmlns="http://www.w3.org/2000/svg">\n ${options.prepend.split`\n`.join`\n `}\n ${paths.join`\n `}\n ${options.append.split`\n`.join`\n `}\n</svg>`, 'utf-8')
    return new Promise((resolve, reject) => {
        if (options.useSvg) resolve(svg)
        else sharp(svg)

            //TODO: Locate Emoji Position
            // .composite(imageEmoji)

            .png().toBuffer((err, buffer) => {
                if (err) return reject(err)
                buffer.top = yMin
                resolve(buffer)
            })
    })
}

module.exports.loadFont = function (...fontPaths) {
    let checkPaths = ['.']
    switch (require('os').type()) {
        case 'Windows_NT':
            checkPaths = [
                ...checkPaths,
                path.join(process.env.windir, 'Fonts'),
                path.join(process.env.LOCALAPPDATA, 'Microsoft', 'Windows', 'Fonts'),
            ]
            break
        case 'Darwin':
            checkPaths = [
                ...checkPaths,
                '$HOME/Library/Fonts',
                '/System/Library/Fonts',
                '/Library/Fonts',
                '~/Library/Fonts',
            ]
            break
        case 'Linux':
            checkPaths = [
                ...checkPaths,
                '/usr/local/share/fonts',
                '/usr/share/fonts',
                '~/.fonts',
            ]
            break
    }
    for (let fontPath of fontPaths) {
        let exts = [path.extname(fontPath)]
        if (exts[0] == '') exts = ['.ttf', '.otf', '.woff2', '.TTF', '.OTF', '.WOFF2']
        for (let checkPath of checkPaths) {
            for (let extname of exts) {
                const FontPath = path.resolve(path.join(checkPath, fontPath + extname))
                if (fs.existsSync(FontPath)) {
                    let font = opentype.loadSync(FontPath)
                    font.path = FontPath
                    font.height = font.ascender - font.descender
                    return font
                }
            }
        }
    }
}

function dataURI2Buffer(dataURI) {
    return Buffer.from(dataURI.split(',')[1], 'base64')
}

function find(emoji) {
    return emojiData.filter(data => data.browser === emoji)[0]
}