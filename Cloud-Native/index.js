const formidable = require('formidable');
const express = require('express');
const fs = require('fs');
const config = require('./config');
const server = express();

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
});

const uploadToS3 = (fileStream, fileName) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: config.s3bucket,
        Key: fileName, // File name you want to save as in S3
        Body: fileStream
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
}

server.post('/upload', (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.end("Couldn't do it.")
            return;
        }

        let file = files.fileName;

        let fileName = file.name;
        let fileStream = fs.createReadStream(file.path)
            .on('error', function (err) {
                console.log('File Error', err);
            });

        uploadToS3(fileStream, fileName);

        console.log('Uploading file...');
        res.json({ fields, files });
    })
});


server.listen(3000, () => {
    console.log(`Server started on http://localhost:${3000}`);
});

