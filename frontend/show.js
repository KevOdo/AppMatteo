var fs = require('fs')

function showPage(response, pathName) {
    if(pathName === "/"){
        fs.readFile("./src/main.html", function (err, html) {
            if (err) {
                throw err;
            }
            response.writeHead(200);
            response.write(html);
            response.end();
        })
    } else {
        response.writeHead(404)
        response.write("<h1>Error 404: Page Not found</h1>")
        response.end();
    }
}

exports.showPage = showPage;