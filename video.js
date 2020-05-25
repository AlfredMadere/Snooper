const { exec } = require("child_process");
const rightNow = require('./formatted_date');

function makeVideo(){
	var fileName = "videos/screenvid-" + rightNow() + ".mp4";
	var executable = "ffmpeg -r 6 -f image2 -pattern_type glob -i 'shots/*.png' -vcodec libx264 -pix_fmt yuv420p " + fileName;
	return new Promise((resolve, reject) => {
		exec(executable, (error, stdout, stderr) => {
		    if (error) {
		        return reject(error);
		    }
		    if (stderr) {
		        console.log(`stderr: ${stderr}`);
		    }
			return resolve(fileName, stdout, stderr);
		});
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

module.exports.makeVideo = makeVideo;
module.exports.cleanUpShots = cleanUpShots;