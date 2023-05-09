const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log('Hi! You are here: Task 1.\nText is below:\n'));
emitter.emit('start');



const fs = require("fs");

const readableStream = fs.createReadStream("./01-read-file/text.txt", "utf-8");
readableStream.on('error', function (error) {
    console.log(`error: ${"please, try again"}`);
})

readableStream.on('data', (chunk) => {
    console.log(chunk);
})

