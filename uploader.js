const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME = "jj-desktop";
const fileName = "fileName";

function uploadFile(fileName){
	const readStream = fs.createReadStream(fileName);

	AWS.config.loadFromPath('./credentials.json');

	var s3 = new AWS.S3();

	const uploadParams = {
	    Bucket: BUCKET_NAME,
	    Key: fileName,
	    Body: readStream
 	};
 	return new Promise((resolve, reject) => {
 		s3.upload(uploadParams, function(err, data) {
		    readStream.destroy();
		      
		    if (err) {
		        return reject(err);
		    }
		      
		    return resolve(data);
		});
	});
}

module.exports = uploadFile;