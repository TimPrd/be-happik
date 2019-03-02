import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  background-color: ${props => props.theme.colors.greyf7};
  z-index: 0;
`;

const Items = styled.div`
  margin-left:auto;
  margin-right:0;
`;

const NavBar = () => (
  <Container>
    hello world
    <Items />
  </Container>
);

export default NavBar;
