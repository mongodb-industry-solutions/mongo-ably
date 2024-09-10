require('dotenv').config();

import Ably from 'ably';

const ablyApiKey = process.env.ABLY_KEY;

const ably = new Ably.Realtime(ablyApiKey);

export const ablyChannel = ably.channels.get('mongo-test');
