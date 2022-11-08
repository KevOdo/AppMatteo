const express = require('express');
const path = require('path')
const app = express();
const hostname = "localhost";
const port  = process.env.PORT || 8888;

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"./src/main.html"));
})

app.listen(port, () => {
    console.log("Server start")
})