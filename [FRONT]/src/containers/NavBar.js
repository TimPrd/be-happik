import React from 'react';
import styled from 'styled-components';
import Head from '../components/Head'
const Container = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  color:black;
  font-size:14px;
  background-color: ${props => props.theme.white};
  z-index: 0;
  box-shadow: 0 0px 7px 0px grey;
`;

const NavBar = () => (
    <Container>
       <Head/>
    </Container>
);

export default NavBar;
