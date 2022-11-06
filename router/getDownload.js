const express = require('express');
const path = require('path');
let router = express.Router();
const template = require('art-template');


router.get('/download/:modName/:minecraftVersion/:modVersion', (req, res) => {
    let param = req.params
    let downloadUrl;
    let fileName;
    let html = template(path.join(__dirname, "../view/index.art"), {
        data: {
            download: downloadUrl,
            fileName: fileName
        }
    })
    res.send(html)
})

module.exports = router;