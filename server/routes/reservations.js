var express = require('express');
var router = express.Router();

const secrets = require('../secrets.json');
const accountSid = secrets.twilio.sid;
const authToken = secrets.twilio.authToken;
const client = require('twilio')(accountSid, authToken);
https://demo.twilio.com/welcome/sms/reply/
/* GET users listing. */
router.get('/', function (req, res, next) {
      client.messages
            .create({ body: 'Hi there!', from: secrets.twilio.twilioPhone, to: secrets.twilio.pavelPhone })
            .catch(err => {
                  console.error(err);
                  next();
            })
            .then(message => console.log(message)).done();

      res.json(
            [{
                  id: 1,
                  name: 'avena'
            },
            {
                  id: 2,
                  name: 'bar piti'
            },
            {
                  id: 3,
                  name: 'cipriani'
            },
            {
                  id: 4,
                  name: 'left bank'
            }
            ]
      );
});

module.exports = router;
