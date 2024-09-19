import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { useSelector } from 'react-redux'
import MessageList from './MessageList';
import { setNewMessage, setNewMessageUpdated } from '../redux/slices/MessageSlice';

const messagesHistoryDescription = "Messages contain the data that a client is communicating, such as the contents of a chat message. Clients publish messages on channels, and these messages are received by clients that have subscribed to them. "
const messagesUpdatedDescription = "The Channel object can also emit one event that is not a state change: an update event. This happens when there’s a change to channel conditions for which the channel state doesn’t change"

const TabsContainer = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(0)
    const messagesHistory = useSelector(state => state.Message.list)
    const messagesUpdated = useSelector(state => state.Message.updates)
    const newMessage = useSelector(state => state.Message.newMessage)
    const newMessageUpdates = useSelector(state => state.Message.newMessageUpdates)

    useEffect(() => {
        dispatch(setNewMessage(false))
        dispatch(setNewMessageUpdated(false))
    }, [selected])
    
    return (
        <div className='TabsContainer'>
            <Tabs aria-label="messages-tabs" setSelected={setSelected} selected={selected}>
                <Tab // this is tab 0
                    name={
                        <p> 
                            Messages history 
                            <label className={selected === 1 && newMessage ? "noti": "d-none"}/> 
                        </p>
                    } 
                    id="tab-hist"
                >
                    <MessageList 
                        messages={messagesHistory} 
                        description={messagesHistoryDescription}
                        messageType="regular"
                    />
                </Tab>
                <Tab // this is tab 1
                    name={
                        <p> 
                            Messages updated 
                            <label className={selected === 0  && newMessageUpdates ? "noti": "d-none"}/> 
                        </p>
                    } 
                    id="tab-hist"
                >
                    <MessageList 
                        messages={messagesUpdated}
                        description={messagesUpdatedDescription}
                        messageType="update"
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabsContainer