
var capturing = true;

const { exec } = require("child_process");



function screenCapture(){
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

function scheduleCapture() {
	setTimeout(() => {
		screenCapture();
		if (capturing){
			scheduleCapture();
		} 
	}, 1000);
}

scheduleCapture();
