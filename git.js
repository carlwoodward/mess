var open = require('nodegit').Repo.open;

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
