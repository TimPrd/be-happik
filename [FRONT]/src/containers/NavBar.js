import React from 'react';
import styled from 'styled-components';
import Head from '../components/Head'
const Container = styled.div`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  color:black;
  font-size:14px;
  background-color: #ffffff;
  box-shadow: 1px 2px 13px 0px rgba(0,0,0,0.1);
  align-items: center;
  flex-direction: row-reverse;
`;

const NavBar = () => (
    <Container>
       <Head/>
    </Container>
);

export default NavBar;
