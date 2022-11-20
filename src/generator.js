const template = require('art-template');
const fs = require('fs');
const path = require("path");

function genMainPage() {
    let html = template(path.join(__dirname, "../view/index.html"), {})
    fs.mkdir(`build/`, {recursive: true}, () => {
        fs.writeFile(`build/index.html`, html, err => {
            if (err) console.log(err);
        })
    });
}

function genVersion(modName, mcVersion, modVersion) {
    const path = require('path')
    let file = `${modName}-${mcVersion}-${modVersion}.jar`;
    let url = `https://maven.bzgzs.cn/cn/bzgzs/${modName}/${modName}-${mcVersion}/${modVersion}/${file}`;
    let html = template(path.join(__dirname, "../view/download.html"), {
        file: file,
        url: url
    })
    fs.mkdir(`build/${modName}/${mcVersion}/${modVersion}`, {recursive: true}, () => {
        fs.writeFile(`build/${modName}/${mcVersion}/${modVersion}/index.html`, html, err => {
            if (err) console.log(err);
        })
    });
}

function genLatest(modName, mcVersion, modVersion) {
    const path = require('path')
    let file = `${modName}-${mcVersion}-${modVersion}.jar`;
    let url = `https://maven.bzgzs.cn/cn/bzgzs/${modName}/${modName}-${mcVersion}/${modVersion}/${file}`;
    let html = template(path.join(__dirname, "../view/download.html"), {
        file: file,
        url: url
    })
    fs.mkdir(`build/${modName}/${mcVersion}/latest`, {recursive: true}, () => {
        fs.writeFile(`build/${modName}/${mcVersion}/latest/index.html`, html, err => {
            if (err) console.log(err);
        })
    });
}

module.exports = {
    genMainPage,
    genVersion,
    genLatest
}