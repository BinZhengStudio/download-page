const fs = require('fs');
const fs_extra = require('fs-extra');
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
    generator.genMainPage();
    fs_extra.copy('public/', 'build/')
    fs.readFile(filePath, (err, data) => {
        parser.parseString(data, (e, res) => {
            let artifactId = res.metadata.artifactId[0].split('-');
            res.metadata.versioning[0].versions[0].version.forEach(v => {
                generator.genVersion(artifactId[0], artifactId[1], v);
            })
            generator.genLatest(artifactId[0], artifactId[1], res.metadata.versioning[0].latest[0])
        })
    })
});