const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1'});

//  Creating S3 service object
s3 = new AWS.S3({ apiVersion: '2006-03-01' });

//  Calling s3 to list the buckets
s3.listBuckets((err, data) => {
    if(err) {
        console.log("Error occured: ", err);
    } else {
        console.log("Successful request: ", data.Buckets);
    }
});
