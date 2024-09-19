require('dotenv').config();

import Ably from 'ably';

const ablyApiKey = process.env.REACT_APP_ABLY_KEY;

const ably = new Ably.Realtime(ablyApiKey);

export const ablyChannel = ably.channels.get('mongo-test');
export const ablyChannelUpdates = ably.channels.get('updates');
