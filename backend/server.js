const express = require('express');
const { MongoClient } = require('mongodb');
const Ably = require('ably').Realtime;
const { v4: uuidv4 } = require('uuid'); // For generating random message IDs

require('dotenv').config();

// Access environment variables
const ablyApiKey = process.env.ABLY_KEY;
const mongoUri = process.env.MONGO_URI;

const app = express();
const ably = new Ably(ablyApiKey);
const ablyChannel = ably.channels.get('mongo-test');

// Connect to MongoDB using the environment variable
let db, collection;

MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db('mongodb-ably-demo'); 
    collection = db.collection('mongo-test');
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Function to generate random messages
function generateRandomMessage() {
  const messages = [
    'Hello World!',
    'Random message here!',
    'Another message for you!',
    'Check this out!',
    'Real-time messaging is cool!',
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Function to send random messages to Ably every 3 seconds
function sendMessageToAbly() {
  setInterval(() => {
    const randomMessage = {
      id: uuidv4(),
      content: generateRandomMessage(),
      timestamp: new Date(),
    };

    ablyChannel.publish('message', randomMessage, (err) => {
      if (err) {
        console.error('Error publishing message to Ably:', err);
      } else {
        console.log('Message sent to Ably:', randomMessage);
      }
    });
  }, 3000); // 3000 milliseconds = 3 seconds
}

// Start sending messages as soon as the server starts
sendMessageToAbly();

// Subscribe to the Ably channel and store incoming messages in MongoDB
ablyChannel.subscribe('message', async (message) => {
  try {
    await collection.insertOne({
      content: message.data.content,
      timestamp: message.data.timestamp,
      ablyMessageId: message.data.id,
    });
    console.log('Message stored in MongoDB:', message.data);
  } catch (err) {
    console.error('Error storing message in MongoDB:', err);
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
