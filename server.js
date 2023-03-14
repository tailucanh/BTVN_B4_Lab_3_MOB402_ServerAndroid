const http = require("http");
const fs = require("fs");
const url = require("url");
var formidable = require("formidable");
var dir = "D:/Android/AndroidPoly/MOB402_Android_Server/BTVN_B4/FileUpLoad/";

http
  .createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname == "/fileupload") {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        var newpath = dir + files.filetoupload.originalFilename;
        fs.copyFile(oldpath, newpath, (err) => {
          if (err) throw err;
          fs.unlink(oldpath, (err) => {
            if (err) throw err;
            res.write("File uploaded and moved!");
            res.end();
          });
        });
      });
    } else if (parsedUrl.pathname === "/") {
      fs.readFile("index.html", function (err, data) {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          return res.end("404 Not Found");
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("404 Not Found");
      return res.end();
    }
  })
  .listen(8000);
