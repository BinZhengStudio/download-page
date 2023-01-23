const template = require('art-template');
const fs = require('fs');
const path = require("path");

function genMainPage() { // 生成主页
    let html = template(path.join(__dirname, "../view/index.html"), {})
    fs.mkdir(`build/`, {recursive: true}, () => {
        fs.writeFile(`build/index.html`, html, err => {
            if (err) console.log(err);
        })
    });
}

function genVersion(modName, mcVersion, modVersion) {
    fs.mkdir(`build/${modName}/${mcVersion}/${modVersion}`, {recursive: true}, () => {
        fs.writeFile(`build/${modName}/${mcVersion}/${modVersion}/index.html`, getPage(modName, mcVersion, modVersion), err => {
            if (err) console.log(err);
        })
    });
}

function genLatest(modName, mcVersion, modVersion) {
    fs.mkdir(`build/${modName}/${mcVersion}/latest`, {recursive: true}, () => {
        fs.writeFile(`build/${modName}/${mcVersion}/latest/index.html`, getPage(modName, mcVersion, modVersion), err => {
            if (err) console.log(err);
        })
    });
}

function getPage(modName, mcVersion, modVersion) {
    const path = require('path')
    let file = `${modName}-${mcVersion}-${modVersion}.jar`;
    let url = `/cn/bzgzs/${modName}/${modName}-${mcVersion}/${modVersion}/${file}`;
    return template(path.join(__dirname, "../view/download.html"), {
        file: file,
        url: url
    });
}

module.exports = {
    genMainPage,
    genVersion,
    genLatest,
    getPage
}