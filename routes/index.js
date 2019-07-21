var express = require('express');
var router = express.Router();
var axios = require('axios');

var slack = {};

if (process.env.NODE_ENV !== 'production') {
  slack = require('../secrets.json').slack;
} else {
  slack = {
    one: process.env.SLACK_ONE,
    two: process.env.SLACK_TWO,
    three: process.env.SLACK_THREE,
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  (async () => {
    try {
      const res = await axios.post(`https://hooks.slack.com/services/${slack.one}/${slack.two}/${slack.three}`, {
        "text": "second message"
      });

    } catch (e) {
      console.error(e);
    }


  })();

  res.render('index', { title: 'Express' });
});

module.exports = router;
