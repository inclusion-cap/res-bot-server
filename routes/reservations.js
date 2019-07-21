var express = require('express');
var router = express.Router();
var axios = require('axios');

// /api

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

router.post('/slack-confirmation', function (req, res, next) {
      console.log('request to confirm was made \n\n', req.body);
      res.send(req.body.challenge);
});

router.post('/slack-hello', function (req, res, next) {
      (async () => {
            try {
                  await axios.post(`https://hooks.slack.com/services/${slack.one}/${slack.two}/${slack.three}`, {
                        "text": "second message"
                  });

            } catch (e) {
                  console.error(e);
            }
      })();

      res.render('index', { title: 'Check the channel' });
});

router.post('/slack-reservation', function (req, res, next) {
      console.log('request to slack reservation\n\n', req.body);
});

module.exports = router;
