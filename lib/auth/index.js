var fs    = require('fs'),
    path  = require('path');

let filepath = path.join(__dirname, '../../credentials.json');

module.exports.creds = JSON.parse(fs.readFileSync(filepath, 'utf8'));