const fs = require("fs")
const text = fs.readFileSync("./urls.txt", "utf-8")
const urls = text.split("\n")

const Screenshot = require('url-to-screenshot')
const sanitize = require('sanitize-filename')

async function takeScreenshots() {
  let i = 0
  while (i < urls.length) {
    const url = urls[i]
    await new Screenshot(url)
    .width(800)
    .height(600)
    .capture()
    .then(img => {
      const name = sanitize(url)
      fs.writeFileSync(`${__dirname}/${name}.png`, img)
      console.log(`${name}.png`)
    })
    i++;
  }
}

takeScreenshots()
