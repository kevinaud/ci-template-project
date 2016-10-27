#!/usr/bin/env node

'use strict';

var co      = require('co'),
    path    = require('path'),
    auth    = require('../lib/auth'),
    cli     = require('../lib/cli'),
    Github  = require('../lib/github'),
    Git     = require('../lib/git'),
    NgCli   = require('../lib/ng-cli'),
    S3      = require('../lib/s3'),
    Travis  = require('../lib/travis-ci');

var main = co.wrap(function * () {

  try {
    // get name of project
    let projectName = yield cli.prompt('Project Name - ');

    // generate a new angular app using the specified project name
    let ng = new NgCli();
    ng.newApp(projectName)

    // Add .travis.yml to root of new project
    let pathToYml = path.join(__dirname, '../templates/.travis.yml');
    ng.addFileToRoot(projectName, pathToYml);

    // create a new github remote repo
    let github = new Github(auth.creds);

    try {
      let response = yield github.createRepo(projectName);
    }
    catch(err) {
      cli.printError(err);
    }

    // get a github auth token for travis ci
    let scopes = [
      "read:org", "user:email", "repo_deployment",
      "repo:status", "write:repo_hook"
    ];
    let note = "temporary token to auth against travis";

    let githubAuthToken = yield github.getTemporaryAuthToken(scopes, note);

    // setup travis ci integration for repo
    var travis = new Travis();
    yield travis.init(githubAuthToken.token);
    
    // get hook id of new repository
    var hookId = yield travis.getHookId(projectName);

    // activate travis ci web hook for new repo
    yield travis.activateHook(hookId);

    // delete temporary github auth token
    github.deleteTemporaryAuthToken(githubAuthToken.url);

    // initialize a local git repo, add files to it 
    let git = new Git(projectName);

    let gitConfig = {
      projectName: projectName,
      username: auth.creds.github.username,
      password: auth.creds.github.password
    };

    git.setup(gitConfig);

    // make and configure a new S3 bucket with project name
    /*var s3 = new S3(auth.creds); 

    var response = yield s3.createBucket(projectName);
    console.log(response);*/
  

  }
  catch(err) {
    cli.printError(err);
  }

});

main();