import React from 'react'
import styled from 'styled-components'
import restaurants from '../assets/images/restaurants.png'
import { breakpoints } from '../styles/breakpoints'
import { Button } from './Button'
import { Heading } from './typography/Heading'

const StyledButton = styled(Button)`
  margin-top: 2.5rem;
`

const Container = styled.div`
  position: relative;
  overflow: hidden;
  background: #e5f8bc;
  width: 100%;
  display: flex;
  height: 487px;
`

const ContentContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  width: 100%;
`

const LeftContainer = styled.div`
  overflow: hidden;
  background: #e5f8bc;
  width: 100%;
  display: flex;
  height: 487px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media ${breakpoints.M} {
    flex: 0.5;
  }
`

const SlidingBackground = styled.div`
  background: url(${restaurants}) repeat-y;
  height: 5076px;
  animation: slide 60s linear infinite;
  width: 100%;
  display: none;

  @keyframes slide {
    0% {
      transform: translate3d(0, -1692px, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }

  @media ${breakpoints.M} {
    display: block;
    flex: 0.5;
  }
`

export const AwardWinningSection = () => (
  <Container>
    <ContentContainer className="container">
      <LeftContainer>
        <Heading className="bolder">Award winning</Heading>
        <Heading>The best restaurants near you!</Heading>
        <StyledButton primary label="Explore best restaurants" />
      </LeftContainer>
      <SlidingBackground />
    </ContentContainer>
  </Container>
)
