const pug = require("pug")
const fs = require("fs")

const index = pug.compileFile("_view/index.pug")
fs.writeFileSync("public/index.html", index({cards: "人狼,狂人,村人"}))
