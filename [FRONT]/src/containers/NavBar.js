import React from 'react';
import styled from 'styled-components';

import Item from '../components/Item';

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

const red = styled.div`
margin-left:auto;
margin-right:0;
`;

const NavBar = () => (
  <Container>
    hello world
    <Items>
      <div style={t? red : blue}>Notif</div>
    </Items>
    
  </Container>
);

export default NavBar;
