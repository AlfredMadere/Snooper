const { exec } = require("child_process");
const collectFrames = require('./screen_capture');
const rightNow = require('./formatted_date');
var captureTime = 5000;
var frameRate = 1000;
var fileName = "videos/screenvid.mp4";

//take the photos for certain amount of time
collectFrames(captureTime, frameRate).then(() => makeVideo()).then(() => cleanUpShots()).catch(err => console.log(err));

//make video and put it in video directory
function makeVideo(){
	var fileName = "videos/screenvid-" + rightNow() + ".mp4";
	var executable = "ffmpeg -r 6 -f image2 -pattern_type glob -i 'shots/*.png' -vcodec libx264 -pix_fmt yuv420p " + fileName;
	exec(executable, (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	        return;
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	        return;
	    }
	    console.log(`stdout: ${stdout}`);
	    console.log("Video: " + fileName);
	});
}

function cleanUpShots(){
	console.log("removing shots");
	var executable = "rm shots/*"
	exec(executable, (error, stdout, stderr) => {
	    if (error) {
	        console.log(`error: ${error.message}`);
	        return;
	    }
	    if (stderr) {
	        console.log(`stderr: ${stderr}`);
	        return;
	    }
	    console.log(`stdout: ${stdout}`);
	    console.log("shots have been deleted");
	});
}




