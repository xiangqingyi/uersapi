var express = require('express'),
  router = express.Router(),
  User = require('../models/User');

var user=[new User({"id":1,"name":"james","age":29}),new User({"id":2,"name":"ken","age":30})];

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
      title: 'User API Express MVC'
    });
});

//列出所有使用者
router.get('/api/v1/user', function (req, res) {
  res.json(user);
});

//新增使用者
router.post('/api/v1/user', function (req, res) {
  let name = req.body.name;
  let userid = user[user.length - 1].id + 1;
  user.push({
    "id": userid,
    "name": name
  });
  res.json(user);
});

//刪除所有使用者
router.delete('/api/v1/user', function (req, res) {
  user = [];
  res.json(user);
});

//資料導入
router.put('/api/v1/user', function (req, res) {
  user = req.body.user;
  res.json(user);
});

/*
使用者指定資源
*/

//查詢指定使用者
router.get('/api/v1/user/:id', function (req, res) {
  let userID = req.params.id;
  let userDate = user.find(x => x.id.toString() === userID);
  userDate = userDate ? userDate : {
    "message": "id:" + userID + " 查無使用者！"
  };
  res.json(userDate);
});

//更新訊息
router.post('/api/v1/user/:id', function (req, res) {
  let userID = req.params.id;
  let name = req.body.name;
  let userDate = user.find(x => x.id.toString() === userID);
  if (userDate) {
    userDate.name = name;
    res.json(user);
  } else {
    res.json({
      "message": "id:" + userID + " 查無使用者！"
    });
  }
});

//刪除使用者
router.delete('/api/v1/user/:id', function (req, res) {
  let userID = req.params.id;
  let userIndex = user.findIndex(x => x.id.toString() === userID);
  if (userIndex>=0) {
    user.splice(userIndex,1);
    res.json(user);
  } else {
    res.json({
      "message": "id:" + userID + " 查無使用者！"
    });
  }
});