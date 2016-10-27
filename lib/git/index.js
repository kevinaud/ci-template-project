'use strict'

var child_process = require('child_process'),
    path = require('path');

module.exports = function(projectDir){

  let response = child_process.execSync('pwd');
  this.rootDir = response.toString('utf-8').replace(/(\r\n|\n|\r)/gm,"") + '/' + projectDir;

  this.setup = function(config) {

    let username = config.username;
    let password = config.password;
    let projectName = config.projectName;

    execute('init');
    execute('add -A');
    execute('commit -m "initial commit"');
    execute('remote add origin https://github.com/' + username + '/' + projectName);
    execute('push https://' + username + ':' + password + '@github.com/' + username + '/' + projectName + ' master');
    
  };

  function execute(command){
    child_process.execSync('cd ' + this.rootDir + ' && git ' + command);
  }

}