import React from 'react'
import { H2, Body} from '@leafygreen-ui/typography';
import { MongoDBLogoMark } from "@leafygreen-ui/logo";
import { Container } from 'react-bootstrap';
import NavbarMDB from '../components/NavbarMDB';
import InputMsg from '../components/InputMsg';
import TabsContainer from '../components/TabsContainer';

const Landing = () => {
  return (
    <div className='Landing'>
        <NavbarMDB/>
        <Container className='mt-3'>
            <H2 className="text-center"><MongoDBLogoMark height={30}/> Ably & MongoDB</H2>
            <Body className="text-center mb-4">
                Ably Chat with Mongo is a delightful demo that allows users to engage in interactive messaging. Engage in real-time communication while enjoying a smooth and interactive chatting experience.
            </Body>
            <InputMsg/>
            <TabsContainer></TabsContainer>
        </Container>
    </div>
  )
}

export default Landing
