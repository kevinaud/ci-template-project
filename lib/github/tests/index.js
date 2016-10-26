var assert = require('assert'),
    co = require('co');

var Github = require('../index.js');

describe('Github', function() {

  describe('constructor', function() {
    
    it('should create a new object', function() {
    
      let github = new Github();
      assert(typeof github !== 'undefined');
    
    });

    it('should initialize username and password', function() {

      let creds = { 
        github: {
          username: "test-user",
          password: "test-pass"
        }
      };

      let github = new Github(creds);

      assert(github.hasOwnProperty('user'), 'Does not have user property');
      assert(github.user.hasOwnProperty('username'), 'User property does not a username property');
      assert(github.user.hasOwnProperty('password'), 'User property does not a password property');
      assert(github.user.username === 'test-user', 'user.username was not initialized to the correct value')
      assert(github.user.password === 'test-pass', 'user.pass was not initialized to the correct value')

    });
  
  });

  describe('createRepo()', function() {

    it('should exist', function() {
      let github = new Github();
      assert(github.hasOwnProperty('createRepo'), 'Does not have createRepo() method');
    })

    it('should require a project name parameter', function() {
      let github = new Github();
      assert.throws(() => {
        github.createRepo();
      }, /No parameters provided/, 'should throw error if no params are provided');
    });

    it('should require project name parameter to be a string', function() {
      let github = new Github();
      assert.throws(() => {
        github.createRepo({});
      }, /First parameter must be of type string/, 'should throw error if first param is not a string');
    });

    it('should require that creds has been properly initialized', function() {
      let github = new Github();
      assert.throws(() => {
        github.createRepo("myProject");
      }, /Must initialize user credentials/, 'should throw error if creds property has not been initialized');

      let invalidCredsObj = { github: {} };
      github = new Github(invalidCredsObj);
      assert.throws(() => {
        github.createRepo("myProject");
      }, /Must initialize user credentials/, 'should throw error if creds property has not been initialized');
    });

  });

});