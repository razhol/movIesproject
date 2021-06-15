var express = require('express');
var router = express.Router();
var userBl = require('../models/UsersBl');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let usersName = await userBl.getAllNamesUsers()
  res.render('editUsers', { names: usersName });
});

router.get('/delete/:name', async function (req, res, next) {
  let name = req.params.name;
  let usersName = await userBl.findByNameAndDelete(name)
  if (usersName == "Created") {
    res.redirect('/editUsers');
  }
});

router.get('/delete/:name', async function (req, res, next) {
  let name = req.params.name;
  let usersName = await userBl.findByNameAndDelete(name)
  if (usersName == "Created") {
    res.redirect('/editUsers');
  }
});

router.get('/update/:name', async function (req, res, next) {
  let obj = await userBl.findbyname(req.params.name);
  res.render('userAddandUpdate', { obj: obj, button: 'update' });
});

router.get('/userAddandUpdate', async function (req, res, next) {
  res.render('userAddandUpdate', { obj: '', button: 'add' });
});

router.post('/updateAdd', async function (req, res, next) {
  let updateoradd = await userBl.updateoradd(req.body)
  if (updateoradd == "Created") {
    res.redirect('/editUsers');
  }
});


module.exports = router;