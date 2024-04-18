const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/twilioDemo';

mongoose.connect('mongodb://localhost:27017/twilioDemo')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error(err));
