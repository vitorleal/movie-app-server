var findCine = require('find-cine');

exports.index = function(req, res) {
  res.send({ type: "error" });
}

exports.api = function(req, res){
  res.charset = 'utf8';
  findCine.near(req.params.address, function(err, results) {
    res.send(results);
  });
};

