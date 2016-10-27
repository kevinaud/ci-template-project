var AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = function(creds) {

  this.accessKeyId = creds.AWS.accessKeyId;
  this.secretAccessKey = creds.AWS.SecretAccessKey;

  this.createBucket = function(bucketName) {

    var params = {
      Bucket: bucketName, /* required */
    };

    var request = s3.createBucket(params);
    return request.promise()

  }

  this.configureBucket = function(bucketName) {



  }

}