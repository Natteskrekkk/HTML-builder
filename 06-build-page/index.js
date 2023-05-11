const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log("Hi! You are here: Task 6.\nPage is ready"));
emitter.emit('start');


const fs = require('fs');
const path = require('path');
const componentsPath = path.join(__dirname, "components");
const destinationPath = path.join(__dirname, "project-dist");
const destinationIndexFile = path.join(destinationPath, "index.html");
const stylesPath = path.join(__dirname, "styles");
const stylesBundle = path.join(destinationPath, "style.css");
const assetsPath = path.join(__dirname, "assets");
const assetsDestination = path.join(destinationPath, "assets");
const templateHTML = path.join(__dirname, "template.html");



fs.mkdir(destinationPath, { recursive: true }, (err) => {
    if (err) throw err;
});

function createFolder(folderPath) {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) throw err;
    });
}


fs.access(destinationPath, (err) => {

    fs.rm(destinationPath, { recursive: true }, (err) => {
        if (err) throw err;
        createFolder(destinationPath);
        createHTML();
        combineStyles();
        copyAssets();
    });

});

function createHTML() {
    fs.readdir(componentsPath, (err, files) => {
        let components = {};
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const readableStream = fs.createReadStream(path.join(componentsPath, file), "utf-8");
            readableStream.on('data', (chunk) => {
                components["{{" + path.parse(file).name + "}}"] = chunk;
                if (i === files.length - 1) {

                    const readableStream = fs.createReadStream(templateHTML, "utf-8");
                    readableStream.on('data', (chunk) => {
                        let newTemplate = chunk;
                        for (let i = 0; i < Object.keys(components).length; i++) {
                            newTemplate = newTemplate.replace(Object.keys(components)[i], components[Object.keys(components)[i]]);
                            if (i === Object.keys(components).length - 1) {
                                fs.writeFile(destinationIndexFile, newTemplate, function (err) {
                                    if (err) throw err;
                                })

                            }
                        }
                    });
                }
            });
        }
    });
}

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
                        fs.appendFile(stylesBundle, chunk, (err, data) => {
                            if (err) throw err;
                        })
                    })
                }
            })
        });
    });
}

function copyAssets() {
    createFolder(assetsDestination);
    fs.readdir(assetsPath, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (dir) {
            const sourceFolder = path.join(assetsPath, dir);
            createFolder(path.join(assetsDestination, dir));
            const newFolder = path.join(assetsDestination, dir);
            fs.readdir(sourceFolder, (err, files) => {
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
                files.forEach(function (file) {
                    fs.copyFile(path.join(sourceFolder, file), path.join(newFolder, file), (err) => {
                        if (err) throw err;
                    });
                });
            });
        });
    });
}








