import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 10%;
`;

const NotFoundPage = () => (
  <Container>
    <h1>
      404 PAGE NOT FOUND
      <span role="img" aria-label=""> 😢 </span>
    </h1>
  </Container>
);

export default NotFoundPage;
