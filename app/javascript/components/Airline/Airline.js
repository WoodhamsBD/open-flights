import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Components
import Header from './Header';
import ReviewForm from './ReviewForm';
import Review from './Review';

// styles
const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #ffffff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding: 0 0 0 50px;
`

// Component
const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    //api/v1/airline/:slug
    // grab props from passing to use for url value
    // match.params.slug
    const slug = props.match.params.slug;

    const url = `/api/v1/airlines/${slug}`;

    axios.get(url)
    .then( res => {
      setAirline(res.data)
      setLoaded(true) 
    })
    .catch( res => console.log(res))
  }, []);

  //Methods for Review Form
  // changes to input fields
  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.name, " ", e.target.value)
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))
  }

  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside submit")

    const csrfToken = document.querySelector('[name=csrf-token').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

    const airline_id = parseInt(airline.data.id);
    axios.post('/api/v1/reviews', {review, airline_id})
      .then(res => {
        let included = [...airline.included, res.data.data]
        setAirline({...airline, included})
        setReview({title: '', description: '', score: 0})
      })
      .catch( res => {
        console.log("error caught in submit", res)
      })
  }

  const setRating = (score, e) => {
    e.preventDefault();
    setReview({...review, score})
  }

  let reviews
  if(loaded && airline.included) {
    reviews = airline.included.map( (item,index) => {
      return (
        <Review key={index} attributes={item.attributes}/>
      )
    })
  }

  return (
    <Wrapper>
      { 
        loaded &&
        <Fragment>
          <Column>
            <Main>
              <Header attributes={airline.data.attributes} reviews={airline.included}/>
            {reviews}
            </Main>
          </Column>
          <Column>
            <ReviewForm 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline.data.attributes}
              review={review}
            />
          </Column>
        </Fragment>
      }
    </Wrapper>
  );
};

export default Airline;