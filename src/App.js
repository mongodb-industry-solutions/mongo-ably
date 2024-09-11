import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Landing from './pages/Landing.js';
import { ablyChannel, ablyChannelUpdates } from './ably.js';
import { addMessagesToList, addMessagesToUpdates, addMessageToList, addMessageToUpdates } from './redux/slices/MessageSlice.js';
import { getAllMessages, getAllMessagesUpdates } from './api/mongodb-ably.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    ablyChannel.subscribe((msg) => {
      console.log("REG MSG, ", msg)
      dispatch(addMessageToList(msg.data))
    });
    ablyChannelUpdates.subscribe((msg) => {
      console.log("UPD MSG, ", msg)
      dispatch(addMessageToUpdates(msg.data))
    });

    return () => {
      ablyChannel.unsubscribe();
      ablyChannelUpdates.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getAllMessagesData = async () => {
      try {
        const result = await getAllMessages();
        if(result)
          dispatch(addMessagesToList(result))
      } catch (err) {

      }
    };
    const getAllMessagesUpdatesData = async () => {
      try {
        const result = await getAllMessagesUpdates();
        if(result)
          dispatch(addMessagesToUpdates(result))
      } catch (err) {

      }
    };

    getAllMessagesData(); // Fetch data on component mount
    getAllMessagesUpdatesData()
  }, [])


  return (
    <div className='App'>
      <Landing></Landing>
    </div>
  );
}

export default App;
