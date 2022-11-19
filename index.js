const fs = require('fs');
const path = require('path');
const parser = require('xml2js').Parser();
const generator = require('./src/generator')

function forEachDir(fromDir, callback) {
    fs.readdirSync(fromDir, {withFileTypes: true}).forEach(dirent => {
        const filePath = path.join(fromDir, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            forEachDir(filePath, callback);
        }
    });
}

forEachDir('maven-metadata', function (filePath) {
    console.log(filePath);
    fs.readFile(filePath, (err, data) => {
        parser.parseString(data, (e, res) => {
            res.metadata.versioning[0].versions[0].version.forEach(v => {
                generator.generateStatic(v);
            })
        })
    })
});