var User = require('../models/user');

module.exports = function(router) {
  router.get('/user', function(req, res) {
    var user = new User();
    // user.firstName = req.body.firstName;
    // user.lastName = req.body.lastName;
    // user.email = req.body.email;
    // user.fbid = req.body.fbid;
    // user.home.city = req.body.home.city;
    // user.home.code = req.body.home.code;
    // user.dream.city = req.body.dream.city;
    // user.dream.code = req.body.dream.code;
    user.firstName = 'test - get request received';
    user.save(function(err, data) {
      if (err)
        throw err;
        res.json(data)
    });
  });
};
