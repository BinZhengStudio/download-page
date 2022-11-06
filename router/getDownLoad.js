const express = require('express');
let axios = require('axios');
let router = express.Router();
const template = require('art-template');
const path = require("path");



router.get('/download/:modName/:minecraftVersion/:modVersion',(req, res)=>{
    let param = req.params;
    let modName = param.modName
    let minecraftVersion = param.minecraftVersion
    let modVersion = param.modVersion
    let fileName = `${modName}-${minecraftVersion}-${modVersion}.jar`;
    let downLoadUrl = `https://mirror-name1.maven.bzgzs.cn/cn/bzgzs/${modName}/${modName}-${minecraftVersion}/${modVersion}/${fileName}`;
    axios.get(downLoadUrl).then(function (){
        let html = template(path.join(__dirname,"../view/index.art"),{
            data:{
                download:downLoadUrl,
                fileName:fileName
            }
        })
        res.send(html)
    }).catch(() => {
        let html = template(path.join(__dirname,"../view/404.art"),{
            data:{}
        })
        res.statusCode = 404
        res.send(html)
    })
})

module.exports = router;