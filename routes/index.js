var findCine = require('find-cine');

exports.index = function(req, res) {
  res.send({ type: "error" });
}

exports.api = function(req, res){
  findCine.near(req.params.address, function(err, results) {
    res.send(results);
  });
};
