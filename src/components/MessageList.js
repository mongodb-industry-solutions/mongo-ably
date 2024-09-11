import React from 'react'
import { Subtitle, Disclaimer, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import UpdateMessageCard from './UpdateMessageCard';
import RegularMessageCard from './RegularMessageCard';

const MessageList = ({ messages, messageType }) => {

    return (
        <div className='MessageList'>
            <Subtitle>
                <small style={{ color: "grey" }}>( {messages?.length} results )</small>
            </Subtitle>
            {/* TODO add search bar */}
            <div className='pe-2 ps-2' style={{ overflowY: "auto", maxHeight: "500px" }}>
                {
                    messages.map((msg) => (
                        messageType === "regular"
                            ?  <RegularMessageCard msg={msg}/>
                            : messageType === "update"
                                ? <UpdateMessageCard msg={msg}/>
                                : <Card
                                    key={msg.id}
                                    className="card-styles"
                                    as="article"
                                >
                                    <Body>Unknown type of message</Body>
                                </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageList
