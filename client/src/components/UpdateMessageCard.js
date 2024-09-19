import React from 'react'
import { Subtitle, Disclaimer, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';

const UpdateMessageCard = ({msg}) => {
    return (
        <Card
            key={msg.id}
            className="card-styles"
            as="article"
            onClick={() => console.log(msg)}
        >
            <Body><strong>{msg.updateStatus?.status}</strong> <br></br> {msg.model}, {msg.year}</Body>
            <Disclaimer>{msg.updateStatus?.scheduledTime}</Disclaimer>
        </Card>
    )
}

export default UpdateMessageCard