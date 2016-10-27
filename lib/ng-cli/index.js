'use strict'

var child_process = require('child_process');

module.exports = function(dir){

  this.newApp = function(projectName) {
    child_process.execSync('mkdir ' + projectName);
    child_process.execSync('cd ' + projectName + ' && npm init -y');
    console.log('starting ng new...');
    let output = child_process.execSync('cd ' + projectName + ' && echo "y" | ng init');
    console.log(output);
    console.log('ng new finished')
  };

  this.addFileToRoot = function(projectName, pathToFile) {
    child_process.execSync('cp ' + pathToFile + ' ./' + projectName);
  }

}