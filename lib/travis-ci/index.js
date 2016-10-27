'use strict';

var rp = require('request-promise');

module.exports = function() {

  this.baseUrl = "https://api.travis-ci.org";
  this.token;

  this.init = function(githubAuthToken){

    // this.token = "iTuPxQ9opnaP-s7AvBFAVA";
    var options = {
        method: 'POST',
        uri: this.baseUrl + '/auth/github',
        body: {
          github_token: githubAuthToken
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/vnd.travis-ci.2+json",
          "User-Agent": "MyClient/1.0.0"
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        console.log("TRAVIS CI TOKEN RESPONSE", response);
        if(response.hasOwnProperty('access_token')){
          console.log("Travis CI Auth token successfully obtained");
          this.token = response.access_token;
          return;
        }
        else {
          throw new Error('Unknown error occured, repository was not successfully created');
        }

      },
      (err) => {
        throw err;
      }
    );

  }

  this.getHookId = function(repoName) {

    var options = {
        method: 'GET',
        uri: this.baseUrl + '/hooks',
        headers: {
          "Accept": "application/vnd.travis-ci.2+json",
          "User-Agent": "MyClient/1.0.0",
          "Authorization": "token " + this.token
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        if(response.hasOwnProperty('hooks')){

          let matches = response.hooks.filter(function(hook) {
            return hook.name === repoName;
          });

          if(matches.length === 0) {
            throw new Error('Repository not found');
          }
          else {
            console.log("hook id successfully retrieved");
            return matches[0].id;
          }

        }
        else {
          throw new Error('Unknown error occured, repository was not successfully created');
        }

      },
      (err) => {
        throw err;
      }
    );

  };

  this.activateHook = function(hookId) {

    var options = {
        method: 'PUT',
        uri: this.baseUrl + '/hooks',
        body: {
          "hook": {
            "id": hookId,
            "active": true
          }
        },
        headers: {
          "Accept": "application/vnd.travis-ci.2+json",
          "User-Agent": "MyClient/1.0.0",
          "Authorization": "token " + this.token,
          "Content-Type": "application/json"
        },
        json: true // Automatically stringifies the body to JSON
    };

    return rp(options).then(
      (response) => {

        if(response.hasOwnProperty('result') && response.result === "true"){
          console.log('Hook Successfully Activated');
          return;
        }
        else {
          console.log(response);
          throw new Error('Unknown error occured, hook was not successfully activated');
        }

      },
      (err) => {
        throw err;
      }
    );

  }

}