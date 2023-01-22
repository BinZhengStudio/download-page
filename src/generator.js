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
        fs.writeFile(`build/${modName}/${mcVersion}/${modVersion}/index.html`, genPage(modName, mcVersion, modVersion), err => {
            if (err) console.log(err);
        })
    });
}

function genLatest(modName, mcVersion, modVersion) {
    fs.mkdir(`build/${modName}/${mcVersion}/latest`, {recursive: true}, () => {
        fs.writeFile(`build/${modName}/${mcVersion}/latest/index.html`, genPage(modName, mcVersion, modVersion), err => {
            if (err) console.log(err);
        })
    });
}

function genPage(modName, mcVersion, modVersion) {
    const path = require('path')
    let file = `${modName}-${mcVersion}-${modVersion}.jar`;
    let url = `https://maven.bzgzs.cn/cn/bzgzs/${modName}/${modName}-${mcVersion}/${modVersion}/${file}`;
    let header = template(path.join(__dirname, "../view/header.html"), {})
    let footer = template(path.join(__dirname, "../view/footer.html"), {})
    let html = template(path.join(__dirname, "../view/download.html"), {
        file: file,
        url: url
    })
    return header + html + footer;
}

module.exports = {
    genMainPage,
    genVersion,
    genLatest
}