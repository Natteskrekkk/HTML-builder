const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log("Hi! You are here: Task 4.\nCheck the copied folder, it's been updated!"));
emitter.emit('start');

const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, "files");
const destinationPath = path.join(__dirname, "files-copy");

fs.mkdir(destinationPath, { recursive: true }, (err) => {
    if (err) throw err;
});

fs.readdir(destinationPath, function (err, files) { // delete previous files
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        fs.unlink(path.join(destinationPath, file), (err) => {
            if (err) throw err;
        });
    });
    fs.readdir(sourcePath, function (err, files) { // create empty files in new derictory
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            fs.copyFile(path.join(sourcePath, file), path.join(destinationPath, file), (err) => {
                if (err) throw err;
            });
        });
    });
});

