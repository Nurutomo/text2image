import { Font } from "opentype.js";

/**
 * Create Text to Image
 * @param {Font} font Font object
 * @param {String} text Input string
 * @param {Number} x X position
 * @param {Number} y Y position
 * @param {Number} size Font Size (px)
 * @param {Object} options
 * @param {String} options.attr SVG Attribute
 * @param {Boolean} options.useSvg Use SVG instead of Image
 * @returns {Promise<Buffer>} XML SVG or Image Buffer
 * @example
 * // PNG
 * text2image.convert(font, 'Hello, World!', 0, 0, 72).then(buffer => {
 *     fs.writeFileSync('hello_world.png', buffer) // <Buffer 89 50 4e ...
 * })
 * 
 * // SVG
 * text2image.convert(font, 'Hello, World!', 0, 0, 72, { useSvg: true }).then(buffer => {
 *     fs.writeFileSync('hello_world.svg', buffer) // <Buffer 3c 73 76 ...
 * })
 */
declare function convert(font: Font, text: String, x?: Number, y?: Number, size?: Number, options?: {
    attr?: String,
    useSvg?: Boolean
}): Promise<Buffer>;

/**
 * Load Font
 * @param {String|Buffer} path Path to font 'path/to/font.ttf'
 * @returns {Font} font object
 * @example
 * const font = text2image.loadFont('path/to/font.ttf') // Font Glyphs Data
 */
declare function loadFont(path: String|Buffer): Font;

/**
 * Static functions
 */
export = {
    convert: convert,
    loadFont: loadFont
}