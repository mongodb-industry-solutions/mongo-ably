import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Landing from './pages/Landing.js';
import { ablyChannel } from './ably.js';
import { addMessageToList } from './redux/slices/MessageSlice.js';

function App() {
  const dispatch = useDispatch();
  const message = useSelector(state => state.Message.typedMsg)


  useEffect(() => {
    ablyChannel.subscribe((msg) => {
      console.log("SUSCRIBED MSG, ", msg)
      dispatch(addMessageToList(msg.data))
    });

    return () => {
      ablyChannel.unsubscribe();
    };
  }, []);

  return (
    <div className='App'>
      <Landing></Landing>
    </div>
  );
}

export default App;
