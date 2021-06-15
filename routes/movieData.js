var express = require('express');
var router = express.Router();
var moviesBl = require('../models/moviesBl');

router.get('/', function (req, res, next) {
  res.render('movieData', { data: '' });
});

router.get('/:name', async function (req, res, next) {
  let name = req.params.name;
  let data = await moviesBl.findDataByName(name);
  res.render('movieData', { data: data });
});

module.exports = router;