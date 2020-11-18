const textToImage = require('../')
const assert = require('assert')
var font
var testText = 'HARTA\nTAHTA\nMANUSIA'

describe('Main', () => {
    it('Loading font \'Arial\'', done => {
        font = textToImage.loadFont('Arial', 'arial', 'monospace')
        assert.ok(font !== undefined)
        done()
    })

    it('Generate SVG and convert to image and save it in \'./test/test.png\'', async () => {
        let buffer = await textToImage.convert(font, testText, 0, 0, 512, {
            align: 'center',
        })
        require('fs').writeFileSync(path = __dirname + '\\test.png', buffer)
        assert.strictEqual(buffer[0], 0x89)
        assert.strictEqual(buffer[1], 0x50)
        assert.strictEqual(buffer[2], 0x4e)
        return buffer
    })

    it('Generate SVG and save it in \'./test/test.svg\'', async () => {
        let buffer = await textToImage.convert(font, testText, 0, 0, 512, {
            useSvg: true,
            align: 'center',
        })
        require('fs').writeFileSync(path = __dirname + '\\test.svg', buffer)
        assert.strictEqual(buffer[0], 0x3c)
        assert.strictEqual(buffer[1], 0x73)
        assert.strictEqual(buffer[2], 0x76)
        return buffer
    })
})
