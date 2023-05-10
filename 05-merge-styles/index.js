const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log("Hi! You are here: Task 5.\n'bundle.css' is ready"));
emitter.emit('start');


const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, "project-dist");
const stylesPath = path.join(__dirname, "styles");
const bundlePath = path.join(directoryPath, "bundle.css");

function combineStyles() {
    fs.readdir(stylesPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {

            fs.stat(path.join(stylesPath, file), function (err, stats) {
                if (err) {
                    return console.log('Unable to get stat: ' + err);
                }
                if (path.parse(file).ext.substring(1, undefined) == "css") {
                    const style = path.join(stylesPath, file);
                    const readableStream = fs.createReadStream(style, "utf-8");
                    readableStream.on('data', (chunk) => {
                        fs.appendFile(bundlePath, chunk, (err, data) => {
                            if (err) throw err;
                        })
                    })
                }
            })
        });
    });
}

fs.access(bundlePath, (err) => {
    if (!err) {
        fs.unlink(bundlePath, (err) => {
            if (err) throw err;
        });
    }
    combineStyles();
});

