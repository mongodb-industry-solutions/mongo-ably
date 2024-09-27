import React, {useEffect} from 'react'
import { H2, Body } from '@leafygreen-ui/typography';
import { MongoDBLogoMark } from "@leafygreen-ui/logo";
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import { Container } from 'react-bootstrap';
import NavbarMDB from '../components/NavbarMDB';
import InputMsg from '../components/InputMsg';
import TabsContainer from '../components/TabsContainer';
import Toggle from '@leafygreen-ui/toggle';
import { sendRandomMessage } from '../api/mongodb-ably';

const Landing = () => {
  let myInterval;

  const startInterval = () => {
    myInterval = setInterval(async () => {
      await sendRandomMessage();
    }, 3000); // 3000 milliseconds = 3 seconds
    
  }
  const onSimulationCLick = (checked) => {
    if (checked)
      startInterval();
    else  
      clearInterval(myInterval)
  }

  useEffect(() => {
    return () => {
      clearInterval(myInterval)
    }
  }, [])
  
  return (
    <div className='Landing'>
      <NavbarMDB />
      <Container className='mt-3'>
        <H2 className="text-center"><MongoDBLogoMark height={30} /> Ably & MongoDB</H2>
        <Body className="text-center">
          Ably Chat with Mongo is a delightful demo that allows users to engage in interactive messaging. Engage in real-time communication while enjoying a smooth and interactive chatting experience.
        </Body>
        <Body className="text-center mb-4 sim-container">
          <strong>
            Enable simulation
            <InfoSprinkle
            id="sprinkle"
            className='inline-block'
            baseFontSize={13}
              triggerProps={{
                onMouseDown: () => { },
                onMouseOver: () => { },
                'aria-label': 'aria-label',
              }}>
              The simulation will start sending random messages to ably every 3 seconds 
            </InfoSprinkle>
            <Toggle
              id="toggle"
              aria-labelledby="label"
              size='xsmall'
              onChange={(checked, event) => {
                onSimulationCLick(checked)
              }}
            />
          </strong>
        </Body>
        <InputMsg />
        <TabsContainer></TabsContainer>
      </Container>
    </div>
  )
}

export default Landing
