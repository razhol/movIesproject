var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.admin) {
    res.render('menu', { edit: 'edit users' });
  }
  else {
    res.render('menu', { edit: '' });
  }

});

module.exports = router;
