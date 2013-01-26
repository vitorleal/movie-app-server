var jsdom = require('jsdom'),
    tmdb  = require('tmdbv3').init('59d35074bb75ae5c4e0bf99e819648c2');

exports.index = function(req, res){
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

  jsdom.env(url,['http://code.jquery.com/jquery-1.5.min.js'],
    function(errors, window) {
        var theaters = window.$('.theater');

        theaters.each(function (key, value) {
          var cine             = new item();
          cine.theater.name    = window.$(this).find('.desc .name a').text();
          cine.theater.address = window.$(this).find('.desc .info').text();
          cine.theater.id      = window.$(this).find('.desc').attr('id').split('_')[1];

          var movies = window.$(this).find('.showtimes .movie');

          movies.each(function (key, value) {
            var peli      = new movie();
            peli.title    = window.$(this).find('.name a').text();
            peli.duration = window.$(this).find('.info').text();
            peli.id       = window.$(this).find('.name a').attr('href').split('id=')[1];
            var horarios  = window.$(this).find('.times a');

            //tmdb.movie_info(peli.title, function(err, res){
              //console.log(res);
            //});

            horarios.each(function (key, value) {
              peli.times.push(window.$(this).text());
            });

            cine.movies.push(peli);
          });

          itens.push(cine);
        });

        res.send(itens);
    });
};
