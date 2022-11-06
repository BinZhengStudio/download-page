const express = require("express")
const path = require('path');
var router = require('./router/getDownload');
const app = express()

app.use(router)
app.use(express.static(__dirname+'/public/assets/'));


const server = app.listen(8080,function (){
    console.log(server.address())
})
