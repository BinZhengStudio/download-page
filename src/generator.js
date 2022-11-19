const template = require('art-template');
const fs = require('fs');

function generateStatic(version) {
    const path = require('path')
    let html = template(path.join(__dirname, "../view/index.html"), {
        file: "test",
        url: "test"
    })
    fs.writeFile(`build/test/${version}/index.html`, html, err => {
        console.log(err);
    })
}

module.exports = {
    generateStatic
}