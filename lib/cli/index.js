var co      = require('co'),
    prompt  = require('prompt-promise');

module.exports.prompt = co.wrap(function * () {

  var response = yield prompt('Project Name - ');
  
  prompt.end();
 
  return response;

});

module.exports.print = function(output) {
  console.log(output);
}

module.exports.printError = function(err) {

  console.log('');
  console.log('--------------------------------------------------------------------');
  console.log('ERROR');
  console.log('--------------------------------------------------------------------');
  console.log(err);
  console.log('');

}