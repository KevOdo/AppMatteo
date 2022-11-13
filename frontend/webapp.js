const express = require('express');
const path = require('path');
const events = require('events');
const app = express();
const hostname = "localhost";
const port  = process.env.PORT || 8888;

const eventEmitter = new events.EventEmitter();

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"./src/main.html"));
})

app.get('/hello', (req, res) => {
    console.log(req);
    console.log(res);
})

app.listen(port, () => {
    console.log("Server start")
    console.log("Listening on port: " + port);
})