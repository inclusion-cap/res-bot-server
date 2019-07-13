var express = require('express');
var router = express.Router();

const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

//https://www.twilio.com/docs/sms/send-messages
client.messages
      .create({body: 'Hi there!', from: '', to: ''})
      .then(message => console.log(message.sid));


/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.json(
//     [{id: 1,
//     name: 'avena'},
//     {id: 2,
//     name: 'bar piti'},
//     {id: 3,
//     name: 'cipriani'},
//     {id: 4,
//     name: 'left bank'}
//   ]
// );
});

module.exports = router;
