const express = require('express');
const router = express.Router();
const builder = require('./build');
const generator = require('./src/generator');
const template = require('art-template');
const parser = require('xml2js').Parser();
const path = require("path");
const fs = require("fs");
const app = express();

// ["mod1", ["mcv1", ["ver1", "ver2"], "latest", "mcv2", ["ver1"], "latest"], "mod2"]
let mods = [];

builder.forEachDir('maven-metadata', function (filePath) {
	console.log(filePath);
	fs.readFile(filePath, (err, data) => { // 读取 xml
		parser.parseString(data, (e, res) => {
			let metadata = res.metadata;
			let versioning = metadata.versioning[0];
			let artifactId = metadata.artifactId[0].split('-'); // 将 modid 与 mc 版本号分开
			versioning.versions[0].version.forEach(v => { // 遍历所有版本
				let modIndex = mods.indexOf(artifactId[0]);
				if (modIndex > -1) { // 若已收录该模组
					let mcVer = modIndex + 1; // mc 版本数组在 mods 的位置
					let mcVerIndex = mods[mcVer].indexOf(artifactId[1]); // mc 版本在版本数组位置
					if (mcVerIndex <= -1) { // 不存在该 mc 版本
						mods[mcVer].push(artifactId[0]);
					}
					mods[mcVer][1].push(v);
				} else {
					mods.push(artifactId[0], [artifactId[1], [v]])
				}
			})
			generator.genLatest(artifactId[0], artifactId[1], versioning.latest[0]) // 生成最新版本下载页
			let modIndex = mods.indexOf(artifactId[0]);
			let mcVer = modIndex + 1; // mc 版本数组在 mods 的位置
			let mcVerIndex = mods[mcVer].indexOf(artifactId[1]);
			mods[mcVer].splice(mcVerIndex + 2, 0, versioning.latest[0]);
		})
	})
});


router.get('/', function (req, res) {
	res.send(template(path.join(__dirname, "./view/index.html"), {}));
})

router.get('/:modName/:mcVersion/:modVersion', (request, res) => {
	console.log(request.method + ': ' + request.url);
	let param = request.params;
	let modName = param.modName;
	let mcVersion = param.mcVersion;
	let modVersion = param.modVersion;
	let modIndex = mods.indexOf(modName);
	if (modIndex > -1) {
		let mcVerIndex = mods[modIndex + 1].indexOf(mcVersion);
		if (mcVerIndex > -1) {
			if (modVersion === "latest") {
				res.send(generator.getPage(modName, mcVersion, mods[modIndex + 1][mcVerIndex + 2]));
			} else {
				if (mods[modIndex + 1][mcVerIndex + 1].indexOf(modVersion) > -1) {
					res.send(generator.getPage(modName, mcVersion, modVersion));
				} else {
					res.statusCode = 404;
					res.send("404 not found");
				}
			}
		}
	}
})

app.use(express.static(__dirname + '/public'));
app.use(router);
app.use(function (req, res) {
	res.send("404 Not Found")
})
const server = app.listen(1145, function () {
	console.log('服务器正在 http://localhost:' + server.address().port + ' 上运行');
})
