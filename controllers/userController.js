const client = require("twilio");
const accountSid = "ACa0774e852f6ea56f2426a8790b050825";
const authToken = "d5e561c7a690629890a0bb49bc4ba69a";

const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const sendSms = async (req, res) => {
    try {
      // Your Twilio phone number and the recipient's phone number
      const fromPhoneNumber = "+919879986027";
      const toPhoneNumber = req.body.phoneNumber;
  
      // Specify the status callback URL
      // const statusCallbackUrl = "http://localhost:5000/sms-status";
  
      // Send SMS with statusCallback
      const twilioClient = client(accountSid, authToken);
      twilioClient.messages
        .create({
          body: "Hello, this is a test message!",
          from: fromPhoneNumber,
          to: toPhoneNumber,
          // statusCallback: statusCallbackUrl,
        })
        .then((message) => console.log('data::',message))
        .catch((error) => console.error(error));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
  createUser,
  sendSms
};
