'use strict';

const express = require('express');
const app = express();
const log4js = require('log4js');
const bodyParser = require('body-parser');
const execSync = require('child_process').execSync;

// log
var LOG_LEVEL = "";
if (process.env.LOG_LEVEL) {
    LOG_LEVEL = process.env.LOG_LEVEL;
}
else {
    LOG_LEVEL = "info";
}

log4js.configure({
    appenders: {
        access: { type: "console", layout: { type: "basic" } }
    },
    replaceConsole: true,
    categories: {
        default: { appenders: ['access'], level: LOG_LEVEL }
    }
});

const accessLogger = log4js.getLogger();
app.use(log4js.connectLogger(accessLogger));

//body-parser setting
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080; // port number

// Read routes folder as root for api
const router = require('./routes/v1/');
app.use('/api/v1/', router);

// Server Start
app.listen(port);
console.log("server stating on " + port + " ...")
console.log("log level: " + LOG_LEVEL)

// Document Root
app.get('/', function (req, res) {
    res.write('Hellow World, API test is sccessful, ABTEST');
    res.end();
});

// Docker Container ID
app.get('/docker', function (req, res) {
    // Stdout docker container id from inside
    const result = execSync(`cat /proc/self/cgroup | grep "docker" | sed s/\\\\//\\\\n/g | tail -1 | cut -c 1-20`);
    res.write('The container id receiving this get requiest is: ');
    res.write(result.toString())
    res.end();
});

app.get('/health', function (req, res) {
    // Stdout docker container id from inside
    res.write('OK');
    res.end();
});


// Docker Container ID
app.get('/pod-id', function (req, res) {
    // Stdout docker container id from inside
    const result = execSync(`cat /proc/self/cgroup | grep "docker" | sed s/\\\\//\\\\n/g | tail -1 | cut -c 1-20`);
    const pod_id = process.env.POD_ID;
    res.write('The container id receiving this get requiest is: ');
    res.write(result.toString());
    res.write('The POD id receiving this get requiest is: ');
    res.write(pod_id.toString());
    res.end();
});