const fs = require("./fs.js");

const path = require("./path.js");

fs.readFile(path.join(__dirname, './build/output/connection.js'), 'utf8', function (err, data) {
  var newContent = "var " + data;
  fs.writeFile(path.join(__dirname, './build/output/connection.js'), newContent, 'utf8', err => {
    if (err) {
      console.log(err);
    }

    console.log('success done');
  });
});