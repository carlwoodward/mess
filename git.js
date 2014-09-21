var Q    = require('q');
var open = require('nodegit').Repo.open;

// Promises implementation of gitlog.

var deferredOpen = Q.nfcall(open, '.');
var deferredGetMaster = function(repo) { return Q.ninvoke(repo, 'getMaster') };

deferredOpen.then(function(repo) {
  return deferredGetMaster(repo);
}).then(function(branch) {
  var history = branch.history();

  history.on('commit', function(commit) {
    console.log(commit.sha(), commit.author(), commit.date(), commit.message());
  });

  history.start();
});

// Nested implementation of gitlog.

open('.', function(err, repo) {
  if (err) throw err;

  repo.getMaster(function(err, branch) {
    if (err) throw err;

    var history = branch.history();

    history.on('commit', function(commit) {
      console.log(commit.sha(), commit.author(), commit.date(), commit.message());
    });

    history.start();
  });
});
