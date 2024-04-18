const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Replace with your desired port

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const twilio = require('twilio');

// Your Twilio Account SID and Auth Token from twilio.com/console
const accountSid = 'AC4a90824412dfa75796fba726ccbce1c3';
const authToken = '522ece79379d1de88899722b9325b937';

// Create a Twilio client
const client = new twilio(accountSid, authToken);

// Your Twilio phone number
const twilioPhoneNumber = '+14435507227';

// The recipient's phone number
const toPhoneNumber = '+91 98799 86027'; // replace with the actual phone number

// The message you want to send
const messageBody = 'Hello, this is a test message from Twilio!';
const statusCallbackUrl = 'https://e72e-2401-4900-1c80-e9c2-ccb2-de53-69b1-fa33.ngrok-free.app/twilio/status'; // replace with your server's URL

// Endpoint to handle Twilio status callbacks
app.get('/twilio', (req, res) => {

// Send the message
client.messages
  .create({
    body: messageBody,
    from: twilioPhoneNumber,
    to: toPhoneNumber,
    statusCallback: statusCallbackUrl
  })
  .then((message) =>res.json({data:message}))
  .catch((error) => res.send(error));
});
app.get('/twilio/status', (req, res) => {
  const messageSid = req.body.MessageSid;
  client.messages(messageSid)
    .fetch()
    .then((message) => {
      res.json({ status: message.status });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});
app.get('/', (req, res) => {

  
    res.status(200).end("rf");
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
