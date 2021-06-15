var express = require('express');
var router = express.Router();
var moviesBl = require('../models/moviesBl');
let geners = []

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('CreateNewMovie', { Geners: '', name: '', language: '', msg: '' });
});


router.post('/addtask', async function (req, res, next) {
  let action = req.body.action;
  if (req.session.trazation <= 0) {
    res.render('CreateNewMovie', { Geners: '', name: '', language: '', msg: 'not have a tranzaction' });
  }
  else {
    if (action == "Send") {
      let name = req.body.Name
      let language = req.body.Language
      if (req.body.newtask != '') {
        geners.push(req.body.newtask)
        res.render('CreateNewMovie', { Geners: geners, name: name, language: language, msg: '' });
      }
      else {
        res.render('CreateNewMovie', { Geners: geners, name: name, language: language, msg: 'empty gener' })
      }
    }
    else if (action == "Sendmovie") {
      if (req.body.name != '' && req.body.Language != '' && geners.length != 0) {
        let lengthRest = await moviesBl.checklength();
        let lengthJson = await moviesBl.checkjsonlength();
        let id = lengthRest + lengthJson;
        let obj = { id: id, name: req.body.Name, language: req.body.Language, genres: geners }
        let status = await moviesBl.SaveMovie(obj)
        if (status == "Created") {
          req.session.trazation--;
          if (req.session.admin) {
            res.render('menu', { edit: 'edit users' })
          }
          else {
            res.render('menu', { edit: '' })
          }
        }
      }
      else {
        res.render('CreateNewMovie', { Geners: geners, name: '', language: '', msg: 'Please fill all the fields' });
      }
    }
  }

});



module.exports = router;
