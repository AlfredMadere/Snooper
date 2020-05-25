
const collectFrames = require('./screen_capture');
const uploadFile = require('./uploader');
const video = require('./video.js');
var captureTime = 5000;
var frameRate = 1000;


collectFrames(captureTime, frameRate)
.then(() => video.makeVideo())
.then((fileName, stdout, stderr) => uploadFile(fileName))
.then(() => video.cleanUpShots())
.catch(err => console.log(err));







