
const { exec } = require("child_process");
var capturing = true;



function screenShot(){
	var now = new Date();
	var photoName = now.getTime() + ".png";
	var executable = "screencapture -x shots/" + photoName;
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
	    console.log("Photo: " + photoName);
	});

}

function delay(time){
	return new Promise(resolve => setTimeout(resolve, time));
}

function collectFrames(time, frequency) {
	scheduleScreenshot(frequency);
	return delay(time).then(stopCapturing).catch(err => console.log(err));
}

function scheduleScreenshot(frequency){
	if(capturing){
		screenShot();
		setTimeout(() => scheduleScreenshot(frequency), frequency);
	}
}

function stopCapturing(){
	capturing = false;
}




module.exports = collectFrames;
