const fs = require("fs");
const path = require('path');
const { stdin, stdout, stderr } = process;
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('start', () => console.log('Привет, сейчас ты проверяешь задание 2. Введи текст ниже:'));
emitter.emit('start');

fs.writeFile(path.join(__dirname, "write.txt"), "", function (err, data) {
    if (err) throw err;
})

stdin.on('data', (data) => {
    fs.appendFile(path.join(__dirname, "write.txt"), data, function (err, data) {
        if (err) throw err;
    })
    if (data.toString().trim() == "exit") {
        process.exit();
    }
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', code => {
    if (code === 0) {
        stdout.write("\nУдачи в изучении Node.js!");
    } else {
        stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
    }
});