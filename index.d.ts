import { Font } from "opentype.js";

/**
 * Create Text to Image
 * @param {Font} font Font object
 * @param {String} text Input string
 * @param {Number} x X position
 * @param {Number} y Y position
 * @param {Number} size Font Size (px)
 * @param {Object} options
 * @param {String} options.attr SVG Path attribute
 * @param {CanvasTextAlign} options.align Align text
 * @param {Number} options.lineHeight Use SVG instead of Image
 * @param {Number} options.padding Use SVG instead of Image
 * @param {Boolean} options.useSvg Use SVG instead of Image
 * @param {String} options.prepend Before Path element
 * @param {String} options.append After Path element
 * @param {String} options.color Define color for your text (hex, color, rgb, rgba)
 * @returns {Promise<Buffer>} XML SVG or Image Buffer
 * @example
 * // PNG
 * text2image.convert(font, 'Hello, World!', 0, 0, 72).then(buffer => {
 *     fs.writeFileSync('hello_world.png', buffer) // <Buffer 89 50 4e ...
 * })
 * 
 * // SVG
 * text2image.convert(font, 'Hello, World!', 0, 0, 72, { useSvg: true, color: 'red' }).then(buffer => {
 *     fs.writeFileSync('hello_world.svg', buffer) // <Buffer 3c 73 76 ...
 * })
 */
declare function convert(font: Font, text: String, x?: Number, y?: Number, size?: Number, options?: {
    align?: CanvasTextAlign,
    attr?: String,
    lineHeight?: Number,
    padding?: Number,
    useSvg?: Boolean,
    color?: String
}): Promise<CustomBuffer>;

/**
 * Load Font
 * @param {FontPath} fontPaths Path to font 'path/to/font.ttf'
 * @returns {Font} font object
 * @example
 * // second argument is used if first argument file doesn't exist
 * // this also checks for default font directory
 * const font = text2image.loadFont('path/to/font.ttf', 'Arial', 'arial.ttf') // Font Glyphs Data
 */
declare function loadFont(...fontPaths: FontPath): Font;

/**
 * Static functions
 */
export = {
    convert: convert,
    loadFont: loadFont
}