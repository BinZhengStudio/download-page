const template = require('art-template');
const fs = require('fs');

const writeFileRecursive = function(path, buffer, callback){
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, {recursive: true}, (err) => {
        if (err) return callback(err);
        fs.writeFile(path, buffer, function(err){
            if (err) return callback(err);
            return callback(null);
        });
    });
}

function generateStatic(version) {
    const path = require('path')
    let html = template(path.join(__dirname, "../view/index.html"), {
        file: "test",
        url: "test"
    })
    fs.mkdir(`build/test/${version}`, {recursive: true}, () => {
        fs.writeFile(`build/test/${version}/index.html`, html, err => {
            if (err) console.log(err);
        })
    });
}

module.exports = {
    generateStatic
}