import React, {useState} from 'react'
import { Tabs, Tab } from '@leafygreen-ui/tabs';
import { useSelector } from 'react-redux'

import MessageList from './MessageList';

const TabsContainer = () => {
    const [selected, setSelected] = useState(0)
    const messagesHistory = useSelector(state => state.Message.list)
    const messagesUpdated = useSelector(state => state.Message.updates)

    return (
        <div className='TabsContainer'>
            <Tabs aria-label="messages-tabs" setSelected={setSelected} selected={selected}>
                <Tab // this is tab 0
                    name={
                        <p> 
                            Messages history 
                            <label className={selected === 1 ? "noti d-none": "d-none"}/> 
                        </p>
                    } 
                    id="tab-hist"
                >
                    <MessageList 
                        messages={messagesHistory} 
                        messageType="regular"
                    />
                </Tab>
                <Tab // this is tab 1
                    name={
                        <p> 
                            Messages updated 
                            <label className={selected === 0 ? "noti d-none": "d-none"}/> 
                        </p>
                    } 
                    id="tab-hist"
                >
                    <MessageList 
                        messages={messagesUpdated}
                        messageType="update"
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

export default TabsContainer