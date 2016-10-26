#!/usr/bin/env node

'use strict';

var co      = require('co'),
    auth    = require('../lib/auth'),
    cli     = require('../lib/cli'),
    Github  = require('../lib/github');

var main = co.wrap(function * () {

  try {
    // get name of project
    let projectName = yield cli.prompt('Project Name - ');

    // generate a new angular app using the specified project name
    let github = new Github(auth.creds);
    cli.print(github.user)

    // create a new github remote repo

    // initialize a local git repo

    // add the new repo as origin

    // add and commit all files in the directory

    // push master branch to origin

  }
  catch(err) {
    cli.printError(err);
  }

});

main();