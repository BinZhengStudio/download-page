const express = require('express');
const router = express.Router();
const builder = require('./src/builder');
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
	parser.parseString(fs.readFileSync(filePath), (e, res) => {
		let metadata = res.metadata;
		let versioning = metadata.versioning[0];
		let artifactId = metadata.artifactId[0].split('-'); // 将 modid 与 mc 版本号分开
		versioning.versions[0].version.forEach(v => { // 遍历所有版本
			let modIndex = mods.indexOf(artifactId[0]);
			if (modIndex > -1) { // 若已收录该模组
				let mcVer = modIndex + 1; // mc 版本数组在 mods 的位置
				let mcVerIndex = mods[mcVer].indexOf(artifactId[1]); // mc 版本在版本数组位置
				if (mcVerIndex <= -1) { // 不存在该 mc 版本
					mods[mcVer].push(artifactId[1]);
					mods[mcVer].push([v]);
				} else {
					mods[mcVer][mcVerIndex + 1].push(v);
				}
			} else {
				mods.push(artifactId[0], [artifactId[1], [v]])
			}
		})
		let modIndex = mods.indexOf(artifactId[0]);
		let mcVer = modIndex + 1; // mc 版本数组在 mods 的位置
		let mcVerIndex = mods[mcVer].indexOf(artifactId[1]);
		mods[mcVer].splice(mcVerIndex + 2, 0, [versioning.latest[0]]);
	})
});

router.get('/', function (req, res) {
	console.log(req.method + ': ' + req.url);
	res.statusCode = 200;
	res.send(template(path.join(__dirname, "./view/index.html"), {}));
})

router.get('/:modName/:mcVersion/:modVersion', (req, res) => {
	console.log(req.method + ': ' + req.url);
	let param = req.params;
	let modName = param.modName;
	let mcVersion = param.mcVersion;
	let modVersion = param.modVersion;
	let modIndex = mods.indexOf(modName);
	if (modIndex > -1) {
		let mcVerIndex = mods[modIndex + 1].indexOf(mcVersion);
		if (mcVerIndex > -1) {
			if (modVersion === "latest") {
				res.statusCode = 200;
				res.send(generator.getPage(modName, mcVersion, mods[modIndex + 1][mcVerIndex + 2][0]));
			} else {
				if (mods[modIndex + 1][mcVerIndex + 1].indexOf(modVersion) > -1) {
					res.statusCode = 200;
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
