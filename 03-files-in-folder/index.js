const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log("Hi! You are here: Task 3.\nFiles' info is below:\n"));
emitter.emit('start');


const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, "secret-folder");

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {

        fs.stat(path.join(directoryPath, file), function (err, stats) {
            if (err) {
                return console.log('Unable to get stat: ' + err);
            }
            if (stats.isFile()) {
                console.log(path.parse(file).name + " - " + path.parse(file).ext.substring(1, undefined) + " - " + stats.size * 0.001 + "kb")
            }
        })


    });
});