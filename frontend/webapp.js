//const http = require('http');
//var url = require('url');
//var show = require('./show')

const express = require('express');
const app = express();
const hostname = "localhost";
const port  = 8888;

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log("Server start")
})

/*const server = http.createServer((req, res) => {
    //res.setHeader("Content-Type", "javascript");
    var pathName = url.parse(req.url).pathname;
    show.showPage(res, "/");
    console.log(req+res)
})

server.listen(port, hostname, () => {
    console.log("Server running");
})*/