const express = require('express');
const server = express();
const fs = require('fs');
const formidable = require('formidable')

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

server.post('/upload', (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.end("Couldn't do it.")
            return;
        }

        let file = files.fileName;
        let fileName = files.fileName.name;

        console.log('Uploading file...');
        // Read content from the file
        //  const fileContent = fs.readFileSync(fileName);
        let fileStream = fs.createReadStream(file.path)
            .on('error', function(err) {
                console.log('File Error', err);
            });

        // Setting up S3 upload parameters
        const params = {
            Bucket: 'immanuella-busari-devcamp-mm',
            Key: fileName, // File name you want to save as in S3
            Body: fileStream
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            res.json({ fields, files });
        });
    });
});


server.listen(3000, () => {
    console.log(`Server started on http://localhost:${3000}`);
});

