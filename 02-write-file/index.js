const fs = require("fs");

fs.writeFile("hello.txt", "Hello мир!", function (error) {
    if (error) throw error; // если возникла ошибка
});