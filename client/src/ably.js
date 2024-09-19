import Ably from 'ably';

require('dotenv').config();

const ablyApiKey = process.env.REACT_APP_ABLY_KEY;

const ably = new Ably.Realtime(ablyApiKey);

export const ablyChannel = ably.channels.get('mongo-test');
export const ablyChannelUpdates = ably.channels.get('updates');
