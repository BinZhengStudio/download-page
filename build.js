const fs = require('fs');
const fs_extra = require('fs-extra');
const path = require('path');
const parser = require('xml2js').Parser();
const generator = require('./src/generator')

function forEachDir(fromDir, callback) {
    fs.readdirSync(fromDir, {withFileTypes: true}).forEach(dirent => {
        const filePath = path.join(fromDir, dirent.name);
        if (dirent.isFile()) { // 遍历到文件则执行回调函数
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            forEachDir(filePath, callback); // 目录则继续遍历
        }
    });
}

function build() {
    forEachDir('maven-metadata', function (filePath) {
        console.log(filePath);
        generator.genMainPage(); // 生成主页面
        fs.readFile(filePath, (err, data) => { // 读取 xml
            parser.parseString(data, (e, res) => {
                let metadata = res.metadata;
                let versioning = metadata.versioning[0];
                let artifactId = metadata.artifactId[0].split('-'); // 将 modid 与 mc 版本号分开
                versioning.versions[0].version.forEach(v => { // 遍历所有版本
                    generator.genVersion(artifactId[0], artifactId[1], v); // 生成所有版本的页面
                })
                generator.genLatest(artifactId[0], artifactId[1], versioning.latest[0]) // 生成最新版本下载页
            })
        })
        fs_extra.copy('public/', 'build/') // 复制 css 与 js 资源
    });
}

build(); // 构建静态页面

module.exports = {
    build,
    forEachDir
}