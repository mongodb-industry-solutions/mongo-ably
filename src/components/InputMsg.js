import React, { useState } from 'react'
import TextInput from '@leafygreen-ui/text-input';
import Button from '@leafygreen-ui/button';
import { Subtitle } from '@leafygreen-ui/typography';
import { ablyChannel } from '../ably';
const { v4: uuidv4 } = require('uuid');

const InputMsg = () => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        const ablyMessage = {
            id: uuidv4(),
            content: message,
            timestamp: new Date(),
        };
        await ablyChannel.publish('message', ablyMessage, (error => {
            console.log("err msg", error)
            return;
        }))
        console.log("suc msg sent")
        setMessage('')
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message.length > 0) {
          sendMessage();
        }
    }

    return (
        <div className='InputMsg row'>
            <Subtitle className="">Messages</Subtitle>
            <div className='pe-1 col-xs-12 col-md-10' style={{backgroundColor: "transparent"}}>
                <TextInput
                    aria-labelledby="Message"
                    placeholder="Type your message"
                    onChange={event => { setMessage(event.target.value) }}
                    value={message}
                    className='w-100'
                    onKeyDown={(e) => handleKeyDown(e)} 
                />
            </div>
            <div className='d-flex align-items-end justify-content-end col-xs-6 col-md-2 p-0 pt-1'>
                <Button
                    variant="primary"
                    className='ms-1 me-1'
                    disabled={message.length <= 0}
                    onClick={() => sendMessage()}
                >
                    Send
                </Button>
                <Button
                    variant="default"
                    disabled={false}
                    onClick={() => setMessage('')}
                >
                    Clear
                </Button>
            </div>
        </div>
    )
}

export default InputMsg