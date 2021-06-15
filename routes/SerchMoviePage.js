var express = require('express');
var router = express.Router();
var moviesBl = require('../models/moviesBl');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let geners = await moviesBl.getAllgenters()
  let languages = await moviesBl.getAllanguages()
  res.render('SerchMoviePage', { Geners: geners, Languages: languages, msg2: '' });
});

router.get('/Searchres', async function (req, res, next) {
  let moviesearch = req.session.moviesearch
  let moviegener = req.session.moviegener
  res.render('SearchResults', { result: moviesearch, moviesgener: moviegener });
})

router.post('/Searchres', async function (req, res, next) {
  if (req.session.trazation <= 0) {
    res.render('CreateNewMovie', { Geners: '', msg: 'not have a tranzaction' });
  }
  else {
    let geners = await moviesBl.getAllgenters()
    let languages = await moviesBl.getAllanguages()
    let namemovie = req.body.moviename;
    let gener = req.body.gener
    let language = req.body.Language
    let obj = { name: namemovie, Gener: gener, Language: language }
    let movieSearch = await moviesBl.searchmovie(obj)
    let movieSearchnew = await moviesBl.searchmovienew(obj)
    if (movieSearch === "movie not found" && movieSearchnew === "movie not found") {
      res.render('SerchMoviePage', { Geners: geners, Languages: languages, msg2: 'not found movie' });
    }
    else if (movieSearch != "movie not found" && movieSearchnew == "movie not found") {
      req.session.trazation--;
      let findMoviesgener = await moviesBl.findMovieByGener(movieSearch)
      req.session["moviesearch"] = movieSearch;
      req.session["moviegener"] = findMoviesgener
      res.render('SearchResults', { result: movieSearch, moviesgener: findMoviesgener });
    }
    else if (movieSearch == "movie not found" && movieSearchnew != "movie not found") {
      req.session.trazation--;
      let findMoviesgener = await moviesBl.findMovieByGener(movieSearchnew)
      req.session["moviesearch"] = movieSearchnew;
      req.session["moviegener"] = findMoviesgener
      res.render('SearchResults', { result: movieSearchnew, moviesgener: findMoviesgener });
    }
    else {
      req.session.trazation--;
      movieSearch.forEach(x => movieSearchnew.push(x));
      let findMoviesgener = await moviesBl.findMovieByGener(movieSearch)
      req.session["moviesearch"] = movieSearchnew;
      req.session["moviegener"] = findMoviesgener
      res.render('SearchResults', { result: movieSearchnew, moviesgener: findMoviesgener });
    }
  }
});


module.exports = router;