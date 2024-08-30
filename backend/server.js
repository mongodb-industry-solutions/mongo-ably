const express = require('express');
const mongoose = require('mongoose');
const Ably = require('ably').Realtime;

require('dotenv').config();

// Access environment variables
const ablyApiKey = process.env.ABLY_KEY;
const mongoUri = process.env.MONGO_URI;

const app = express();
const ably = new Ably(ablyApiKey);
const ablyChannel = ably.channels.get('mongo-test');

// Connect to MongoDB using the environment variable
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const messageSchema = new mongoose.Schema({
  content: String,
  message: { type: String, default: 'hello from the client' },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

Message.collection.name = 'mongo-test';

app.use(express.json());

app.get('/messages', async (req, res) => {
  const { content } = req.body;

  // Use a Promise to ensure message is saved before sending response
  const messagePromise = new Message({ content }).save();

  // Set up the interval to send and save the message
  const intervalId = setInterval(async () => {
    const savedMessage = await messagePromise;
    const timestampedMessage = {
      content: savedMessage.content,
      timestamp: new Date(), // Add the current timestamp
    };

    await ablyChannel.publish('message', timestampedMessage); // Publish to Ably
  }, 3000); // 3000 milliseconds = 3 seconds

  // Clear the interval after 1 minute
  setTimeout(() => {
    clearInterval(intervalId);
  }, 60000); // 60 seconds

  // Send the saved message as the response (assuming success)
  res.status(201).send(await messagePromise);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
