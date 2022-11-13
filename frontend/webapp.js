const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const absolutePath = path.resolve("");
const oldPath = absolutePath.replace("/frontend", "/backend/app-matteo/public/uploads/");
const newPath = absolutePath.replace("AppMatteo/frontend", "Immagini/");
const nm = "salzano.txt";

const hostname = "localhost";
const port  = process.env.PORT || 8888;

app.use("/src", express.static(__dirname + "/src"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"./src/main.html"));
})

app.listen(port, () => {
    console.log("Server start")
    console.log("Listening on port: " + port);
})

fs.watch(oldPath, (eventType, filename) => {
    if(eventType == "rename") {
        if(filename.startsWith("salzano")) {
            fs.rename((oldPath + filename), (newPath + "salzano/" + filename), function (err) {
                if (err) console.log(error);
            })
        } else if (filename.startsWith("zerobranco")) {
            fs.rename((oldPath + filename), (newPath + "zerobranco/" + filename), function (err) {
                if (err) console.log(error);
            })
        }
    }
})