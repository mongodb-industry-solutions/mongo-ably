import React from 'react'
import { Subtitle, Disclaimer, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';

const RegularMessageCard = ({msg}) => {
    return (
        <Card
            key={msg.id}
            className="card-styles"
            as="article"
            onClick={() => console.log(msg)}
        >
            <Body>{msg.content}</Body>
            <Disclaimer>{msg.timestamp}</Disclaimer>
        </Card>)
}

export default RegularMessageCard