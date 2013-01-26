var jsdom = require('jsdom'),
    tmdb  = require('tmdbv3').init('59d35074bb75ae5c4e0bf99e819648c2');

exports.index = function(req, res) {
  res.send({ type: "error" });
}

exports.api = function(req, res){
  var url   = 'http://www.google.com/movies?near=' + req.params.address,
      itens = [],
      item = function () {
        this.theater = {
          name: "",
          address: "",
          id: ""
        },
        this.movies = []
      },
      movie = function () {
        this.title    = "",
        this.id       = "",
        this.duration = "",
        this.times    = []
      }


  // Parse the result
  jsdom.env(url, ['http://code.jquery.com/jquery-1.5.min.js'], function(errors, window) {
    var theaters = window.$('.theater');

    theaters.each(function (key, value) {
      var $  = window.$,
          cine   = new item(),
          movies = $(this).find('.showtimes .movie');

      cine.theater.name    = $(this).find('.desc .name a').text();
      cine.theater.address = $(this).find('.desc .info').text();
      cine.theater.id      = $(this).find('.desc').attr('id').split('_')[1];


      movies.each(function (key, value) {
        var peli      = new movie()
            horarios  = $(this).find('.times > span');

        peli.title    = $(this).find('.name a').text();
        peli.duration = $(this).find('.info').text();
        peli.id       = $(this).find('.name a').attr('href').split('id=')[1];

        horarios.each(function (key, value) {
          peli.times.push($.trim($(this).text().replace('&nbsp', '')));
        });
        //tmdb.movie_info(peli.title, function(err, res){
          //console.log(res);
        //});


        cine.movies.push(peli);
      });

      itens.push(cine);
    });

    res.send(itens);
  });
};
