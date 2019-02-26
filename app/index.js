'use strict';

const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const execSync = require('child_process').execSync;


//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8086; // port number

// Read routes folder as root for api
const router = require('./routes/v1/');
app.use('/api/v1/', router);

//サーバ起動
app.listen(port);
console.log("server stating on " + port + " ...")

// // HTTPS 通信
// var options = {
//     key: fs.readFileSync(path.resolve(__dirname, 'star.api.platform-engineering.seiyu.launcherbot.com', 'privkey.pem')),
//     cert: fs.readFileSync(path.resolve(__dirname, 'star.api.platform-engineering.seiyu.launcherbot.com', 'fullchain.pem'))
// };

// //サーバ起動
// var server = https.createServer(options, app).listen(port, function () {
//     console.log("server stating on " + port + " ...");
// });

//. ドキュメントルートにリクエストがあった場合の処理
app.get('/', function (req, res) {
    res.write('Hellow World, API test is sccessful');
    res.end();
});



app.get('/docker', function (req, res) {
    // Stdout docker container id from inside
    const result = execSync(`cat /proc/self/cgroup | grep "docker" | sed s/\\\\//\\\\n/g | tail -1 | cut -c 1-20`);
    res.write('The container id receiving this get requiest is: ');
    res.write(result.toString())
    res.end();
});
