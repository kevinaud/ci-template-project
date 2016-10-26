'use strict';

var Request = require('request');

module.exports = function(creds){

  this.user = {};

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

    

  }

}