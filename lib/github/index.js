'use strict';

var rp = require('request-promise');

module.exports = function(creds){

  this.user = {};
  this.baseUrl = "https://api.github.com";

  if(typeof creds !== 'undefined') {
    this.user = {
      username: creds.github.username,
      password: creds.github.password
    };
  }

  this.createRepo = function(projectName) {

    if(typeof projectName === 'undefined'){
      throw new Error('No parameters provided');
    }
    if(typeof projectName !== 'string'){
      throw new Error('First parameter must be of type string');
    }
    if(!this.user.hasOwnProperty('username') || 
       !this.user.hasOwnProperty('password') ||
       typeof this.user.username === 'undefined' ||
       typeof this.user.password === 'undefined'){

      throw new Error('Must initialize user credentials');
    
    }

    var options = {
        method: 'POST',
        uri: this.baseUrl + '/user/repos',
        body: {
          name: projectName
        },
        headers: {
          Authorization: "Basic " + new Buffer(this.user.username + ":" + this.user.password, "utf8").toString("base64"),
          "User-Agent": "kevinaud"
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        if(response.hasOwnProperty('name') && response.name === projectName){
          console.log("github repository successfully created");
          return "success";
        }
        else {
          throw new Error('Unknown error occured, repository was not successfully created');
        }

      },
      (err) => {

        if(err.hasOwnProperty('error') && err.error.hasOwnProperty('message') && err.error.message === "Bad credentials"){
          throw new Error("Github username and password are not valid.");
        }

        throw err;
      }
    );

  }

  this.getTemporaryAuthToken = function(scopes, note) {

    var options = {
        method: 'POST',
        uri: this.baseUrl + '/authorizations',
        body: {
          scopes: scopes,
          note: note
        },
        headers: {
          Authorization: "Basic " + new Buffer(this.user.username + ":" + this.user.password, "utf8").toString("base64"),
          "Content-Type": "application/json",
          "User-Agent": this.user.username
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        if(response.hasOwnProperty('token') && response.hasOwnProperty('url')){
          console.log("Temporary Github Auth Token Successfully Obtained");
          let token = {
            token: response.token,
            url: response.url
          }
          
          return token;
        }
        else {
          throw new Error('Unknown error occured, repository was not successfully created');
        }

      },
      (err) => {

        if(err.hasOwnProperty('error') && err.error.hasOwnProperty('message')) {
          if (err.error.message === "Bad credentials"){
            throw new Error("Github username and password are not valid.");
          }
          else if (typeof message === 'string') {
            throw new Error(message);
          }
        }

        throw err;
      }
    );

  }

  this.deleteTemporaryAuthToken = function(url) {

    var options = {
        method: 'DELETE',
        uri: url,
        headers: {
          Authorization: "Basic " + new Buffer(this.user.username + ":" + this.user.password, "utf8").toString("base64"),
          "User-Agent": this.user.username
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        console.log("Github Temporary auth token successfully deleted");
        return;
      },
      (err) => {

        if(err.hasOwnProperty('error') && err.error.hasOwnProperty('message')) {
          if (err.error.message === "Bad credentials"){
            throw new Error("Github username and password are not valid.");
          }
          else if (typeof message === 'string') {
            throw new Error(message);
          }
        }

        throw err;
      }
    );

  }

}