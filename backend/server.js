const express = require('express');
const { MongoClient } = require('mongodb');
const Ably = require('ably').Realtime;
const { v4: uuidv4 } = require('uuid'); // For generating random message IDs

require('dotenv').config();

// Access environment variables
const ablyApiKey = process.env.REACT_APP_ABLY_KEY;
const mongoUri = process.env.REACT_APP_MONGO_URI;

const app = express();
const port = 3001;
const cors = require("cors");
const ably = new Ably(ablyApiKey);
const ablyChannel = ably.channels.get('mongo-test');
const updatesChannel = ably.channels.get('updates'); // Channel for updates
app.use(express.json());
app.use(cors());
// Connect to MongoDB using the environment variable
let db, collection, updatesCollection;

MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db('mongodb-ably-demo'); 
    collection = db.collection('mongo-test');
    updatesCollection = db.collection('updates'); // Collection for updates
    console.log('Connected to MongoDB');

    // Start the MongoDB Change Stream after connecting to the database
    startChangeStream();
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

// Function to start the MongoDB Change Stream
function startChangeStream() {
  const changeStream = updatesCollection.watch();

  changeStream.on('change', (change) => {
    console.log('Change detected in updates collection:', change);

    if (change.operationType === 'insert' || change.operationType === 'update') {
      const document = change.fullDocument;

      if (document) {
        const updateMessage = {
          id: uuidv4(),
          content: document,
          timestamp: new Date(),
        };

        // Publish the change to the 'updates' Ably channel
        updatesChannel.publish('update', updateMessage, (err) => {
          if (err) {
            console.error('Error publishing update to Ably:', err);
          } else {
            console.log('Update sent to Ably:', updateMessage);
          }
        });
      }
    }
  });

  changeStream.on('error', (err) => {
    console.error('Error in Change Stream:', err);
  });
}

// Function to get all the documents inside the mongo-test collection
app.get('/api/mongo-test', async (req, res) => {
  try {
      const data = await collection.find({}).toArray();
      res.status(200).json(data);
  } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).send('Internal Server Error');
  }
});


// Function to get all the documents inside the update collection
app.get('/api/updates', async (req, res) => {
  try {
      const data = await updatesCollection.find({}).toArray();
      res.status(200).json(data);
  } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).send('Internal Server Error');
  }
});

// Function to send random messages to Ably
app.post('/api/sendRandomMessage', async (req, res) => {
    const randomMessage = {
      id: uuidv4(),
      content: generateRandomMessage(),
      timestamp: new Date(),
    };

    ablyChannel.publish('message', randomMessage, (err) => {
      if (err) {
        console.error('Error publishing message to Ably:', err);
        res.status(-1).json({error: err});
      } else {
        console.log('Message sent to Ably:', randomMessage);
        res.status(200).json({randomMessage: randomMessage});
      }
    });∫
    res.status(200).json({randomMessage: randomMessage});
});

app.listen(port, () => {
  console.log('Server is running on port 3001');
});
