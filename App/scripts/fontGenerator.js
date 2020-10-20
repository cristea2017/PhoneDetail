const fs = require('fs')
const fontFileNames = () => {
    const array = fs
        .readdirSync('App/res/fonts')
        .map((file) => {
            return file.replace('.ttf', '')
        })
    return Array.from(new Set(array))
}
const generate = () => {
    const properties = fontFileNames()
        .map((name) => {
            const key = name.replace(/\s/g, '')
            return `'${key}': '${name}'`
        })
        .join(',\n  ')
    const string = `const fonts = {
  ${properties}
}
export default fonts
`
    fs.writeFileSync('App/res/fonts.js', string, 'utf8')
}
generate()