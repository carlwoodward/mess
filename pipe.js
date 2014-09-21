var fs  = require('fs');

var localFile = fs.createWriteStream('localFile.tmp');

process.stdin.pipe(localFile);
