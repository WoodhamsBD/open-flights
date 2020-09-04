import React from 'react';
import styled from 'styled-components';

// Cmoponents
import Rating from '../Rating/Rating';


//Styles
const Card = styled.div`
  border: 1px solid rgb(0,0,0.1);
  border-radius: 4px;
  padding: 20px;
  margin: 0 20px 20px 0;
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const Description = styled.div`
  padding: 0 0 20px 0;
  font-size: 16px;
`

const Title = styled.div`
  padding: 20px 0 0 0;
  font-size: 18px;

`

const Score = styled.div`

`

const Review = (props) => {

  const { score, title, description} = props.attributes

  return (
    <Card>
      <RatingContainer>
        <Rating score={score} />
      </RatingContainer>
      
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  )
}

export default Review;