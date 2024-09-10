import React from 'react'
import { Subtitle, Disclaimer, Body} from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import { useSelector } from 'react-redux'

const MessageList = () => {
    const messages = useSelector(state => state.Message)

    return (
        <div className='MessageList'>
            <Subtitle>
                Messages history <small style={{color:"grey"}}>( {messages.list?.length} results )</small>
            </Subtitle>
            {/* TODO add search bar */}
            <div className='pe-2 ps-2' style={{overflowY: "auto", maxHeight: "500px"}}>
                {
                    messages.list.map((msg) => (
                        <Card 
                            key={msg.id} 
                            className="card-styles" 
                            as="article"
                            onClick={() => console.log(msg)}
                        >
                            <Body>{msg.content}</Body>
                            <Disclaimer>{msg.timestamp}</Disclaimer>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageList
