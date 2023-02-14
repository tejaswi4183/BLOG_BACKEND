const router = require('express').Router();
const user = require('../models/user');
const verify = require('./verifytoken');

router.get('/', verify, (req, res) => {
    /*res.json({
        posts: {
            title: 'my first post',
            description: 'random data you should not access'
        }
    });
    */
   res.send(req.user);
   //user.findbyOne({_id: req.user})
});

module.exports = router;