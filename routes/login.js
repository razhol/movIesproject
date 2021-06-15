var express = require('express');
var router = express.Router();
var userBl = require('../models/UsersBl');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login', { msg: '' });
});

router.post('/manupage', async function (req, res, next) {
  let exist = await userBl.checkUserExist(req.body)
  if (!exist) {
    res.redirect('/')
  }
  else {
    let havetrns = await userBl.HaveTransactions(req.body)
    if (havetrns) {
      let tranzctionNumber = await userBl.numberTransactions(req.body)
      req.session["trazation"] = tranzctionNumber;
      isAdmin = await userBl.IsAdmin(req.body)
      req.session["admin"] = isAdmin;

      if (exist && isAdmin) {
        res.render('menu', { edit: 'edit users' })
      }
      else if (exist && !isAdmin) {
        res.render('menu', { edit: '' })
      }

    }
    else {
      res.render('login', { msg: 'not have trazactions to this user' })
    }

  }



});



module.exports = router;
