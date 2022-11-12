const express = require("express")
const path = require('path');
var router = require('./router/getDownload');
const template = require('art-template')
const app = express()

app.use(router)
app.use(express.static(__dirname+'/public/assets'));
app.use(function (req, res, next) {
    res.send(template(path.join(__dirname, "view/404.art"),{data:{}}))
})

const server = app.listen(8080,function (){
    console.log(server.address())
})
