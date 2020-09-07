const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty');
var request = require('request');

const multipartMiddleware = multipart({
  uploadDir: '/home/sarah/Desktop/rasa_API/rasa_chinese/data'
});


var requireDir = require('require-dir');
var dir = requireDir('./rasa_chinese');
dir = JSON.stringify(dir);


var exec = require('child_process').exec;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(bodyParser.json())

app.post('/api/uploads', multipartMiddleware, (req, res) => {
  console.log(req.files);
  res.json({
      'message': 'File uploaded succesfully.',
      'path': req.files.file.originalFilename
  });
});







app.get('/rasa_train', function (req, res) {

exec('rasa train', {
    cwd: '/home/sarah/Desktop/rasa_API/rasa_chinese'
  }, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    res.send('run ok')
});

})


app.listen(port, () => console.log(`app listening at http://localhost:${port}`))

