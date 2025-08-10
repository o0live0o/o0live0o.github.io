const fs = require('fs')
const path = require('path')

const docsDir = path.join(__dirname, '../public/docs')
const outFile = path.join(__dirname, '../src/docsList.json')

const files = fs.readdirSync(docsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
        name: path.parse(file).name,
        path: `/docs/${file}`
    }))

fs.writeFileSync(outFile, JSON.stringify(files, null, 2))
console.log('Generated docsList.json:', files)